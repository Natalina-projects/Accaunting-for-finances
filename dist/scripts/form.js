export class Form {
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
                name: 'fullName',
                id: 'fullName',
                element: null,
                regex: /^[А-Я"][а-я]*(?: [А-Я"][а-я]*)*$/,
                valid: false,
            });

            this.fields.push({
                name: 'confirmPassword',
                id: 'confirmPassword',
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
                field.element.addEventListener('change', () => this.validateField(field));
            } else {
                console.error(`Элемент с id ${field.id} не найден`);
            }
        });

        this.submitButton = document.getElementById('submit');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.submitForm();
            });
        } else {
            console.error('Submit button not found');
        }

    }

    validateField(field) {
        const element = field.element;
        const inputGroup = element.parentNode;
        const errorMessage = inputGroup.querySelector('.error-message');

        if (!element.value || !element.value.match(field.regex)) {
            inputGroup.classList.add('error');
            errorMessage.textContent = this.getErrorMessage(field);
            errorMessage.style.display = 'block';
            field.valid = false;
        } else {
            inputGroup.classList.remove('error');
            errorMessage.style.display = 'none';
            field.valid = true;

            if (field.name === "confirmPassword") {
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
            case 'fullName':
                return 'Введите ваше ФИО';
            case 'confirmPassword':
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
            try {
                const endpoint = this.page === 'signup' ? 'signup' : 'login';
                const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',

                    },
                    body: JSON.stringify(fieldValues)
                });

                if (!response.ok) {
                    throw new Error('Ошибка запроса');
                }

                const result = await response.json();
                console.log(result);
                alert(this.page === 'signup' ? 'Регистрация успешна!' : 'Вход успешен!');
                window.location.href = this.page === 'signup' ? "/login" : "/";

            } catch (error) {
                console.log('Ошибка', error);
                alert('Произошла ошибка при' + (this.page === 'signup' ? 'регистрации' : 'входе'));
            }
        }
    }
}