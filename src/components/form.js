export class Form {
    constructor() {
        this.fields = [
            {
                name: 'fullName',
                id: 'fullName',
                element: null,
                regex: /^[А-Я"][а-я]*(?: [А-Я"][а-я]*)*$/,
                valid: false,
            },
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
            {
                name: 'confirmPassword',
                id: 'confirm-password',
                element: null,
                regex: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                valid: false,
            },
        ];

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
        if(this.submitButton) {
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
        const errorMessage = inputGroup.nextElementSibling;

        if (!element.value || !element.value.match(field.regex)) {
            inputGroup.classList.add('error');
            errorMessage.style.display = 'block';
            field.valid = false;
        } else {
            inputGroup.classList.remove('error');
            errorMessage.style.display = 'none';
            field.valid = true;

            if(field.name === "confirmPassword") {
                const password = this.fields.find(f => f.name === 'password').element.value;
                if (element.value !== password) {
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

    validateForm() {
        const validForm = this.fields.every(field => field.valid);
        if (validForm) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', 'disabled');
        }
        return validForm;
    }

    submitForm() {
        if (this.validateForm()) {
            const formData = this.fields.reduce((data, field) => {
                data[field.name] = field.element ? field.element.value : '';
                return data;
            }, {});
            console.log('Форма отправлена:', formData);
        }
    }
}