import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";

export class Form {
    static isAuthenticated() {
        return !!Auth.getUserInfo();
    }

    static async logout() {
        await Auth.logout();
        alert('Вы вышли из системы');
        window.location.href = '/login';
    }

    constructor(page) {
        this.page = page;
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                valid: false,
            },
        ];

        if (this.page === 'signup') {

            this.fields.unshift({
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я"][а-я]*(?: [А-Я"][а-я]*)*$/,
                    valid: false,
                },
                {   name: 'lastName',
                    id: 'lastName',
                    element: null,
                    regex: /^[А-Я"][а-я]*(?: [А-Я"][а-я]*)*$/,
                    valid: false,
                });

            this.fields.push({
                name: 'passwordRepeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                valid: false,
            })
        }

        this.init();

    }

    init() {
        this.fields.forEach(field => {
            field.element = document.getElementById(field.id);
            if (field.element) {
                field.element.addEventListener('input', () => this.validateField(field));
            } else {
                console.error(`Элемент с id ${field.id} не найден`);
            }
        });

        this.submitButton = document.getElementById('submit');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', async( event) => {
                event.preventDefault();
                await this.submitForm();
            });
        } else {
            console.error('Submit button not found');
        }

    }

    validateField(field) {
        const element = field.element;
        const inputGroup = element.parentNode;
        const errorMessage = inputGroup.nextElementSibling;

        if (!element.value || !element.value.match(field.regex)) {
            inputGroup.classList.add('error');
            errorMessage.textContent = this.getErrorMessage(field);
            errorMessage.style.display = 'block';
            field.valid = false;
        } else {
            inputGroup.classList.remove('error');
            errorMessage.style.display = 'none';
            field.valid = true;

            if (field.name === "passwordRepeat") {
                const passwordField = this.fields.find(f => f.name === 'password').element;
                if (element.value !== passwordField.value) {
                    inputGroup.classList.add('error');
                    errorMessage.textContent = 'Пароли не совпадают';
                    errorMessage.style.display = 'block';
                    field.valid = false;
                } else {
                    inputGroup.classList.remove('error');
                    errorMessage.style.display = 'none';
                    field.valid = true;
                }
            }
        }

        this.validateForm();
    }

    getErrorMessage(field) {
        switch (field.name) {
            case 'email':
                return 'Введите корректный адрес электронной почты';
            case 'password':
                return 'Пароль должен содержать как минимум 8 символов, включая буквы, цифры и специальные символы';
            case 'name':
                return 'Введите ваше имя';
            case 'lastName':
                return 'Введите вашу фамилию';
            case 'passwordRepeat':
                return 'Пароли не совпадают';
            default:
                return 'Некорректное значение';
        }
    }

    validateForm() {
        const validForm = this.fields.every(field => field.valid);
        if (validForm) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', 'disabled');
        }
        return validForm;
    }
    async submitForm() {
        if (this.validateForm()) {
            const fieldValues = this.fields.reduce((acc, field) => {
                acc[field.name] = field.element.value;
                return acc;
            }, {});
            console.log('Отправляемые данные:', fieldValues);
            try {
                const endpoint = this.page === 'signup' ? 'signup' : 'login';
                const response = await CustomHttp.request(`http://localhost:3000/api/${endpoint}`, "POST", fieldValues);

                if (!response || response.error) {
                    throw new Error(response.error || 'Неизвестная ошибка');
                }

                console.log('Данные от сервера', response);

                if (this.page === 'login') {
                    Auth.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
                }

                Auth.setUserInfo({
                    name: response.user.name,
                    lastName: response.user.lastName,
                    email: response.user.email
                });

                if (this.page === 'signup') {
                    window.location.href = '/login';
                } else {
                    console.log('Переход на главную страницу');
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Ошибка', error);
                alert(`Произошла ошибка: ${error.message}`);
            }
        }
    }
}