import config from "../config/config";
import {CustomHttp} from "../services/custom-http";
export class CreateCategory {
    constructor() {
        this.type = this.getCategoryTypeFromURL();
        this.initPage();
    }

    getCategoryTypeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('type');
    }

    initPage() {
        const titleElement = document.querySelector('.content-title');
        const submitBtn = document.querySelector('.btn-success');

        if (this.type === 'income') {
            titleElement.textContent = 'Создание категории доходов';
            submitBtn.textContent = 'Создать доход';
        } else if (this.type === 'expense') {
            titleElement.textContent = 'Создание категории расходов';
            submitBtn.textContent = 'Создать расход';
        } else {
            console.error('Неизвестный тип категории');
        }

        this.initEventListeners();
    }

    initEventListeners() {
        const canselBtn = document.querySelector('.deleteBtn');
        canselBtn.addEventListener('click', () => {
            window.history.back();
        });
        const submitBtn = document.querySelector('.btn-success');
        submitBtn.addEventListener('click', () => {
            const categoryNameInput = document.querySelector('.name');
            const categoryName = categoryNameInput.value.trim();
            this.validateCategory(categoryName, categoryNameInput);
        })
    }

    validateCategory(categoryName, categoryNameInput) {
        this.clearValidationError(categoryNameInput);
        if (categoryName === '') {
            this.showValidationError(categoryNameInput, 'Название категории не может быть пустым');
            return;
        }
        this.createCategory(categoryName);
    }

    showValidationError(inputElement, message) {
        inputElement.classList.add('input-error');
        let errorMessageElement = inputElement.nextElementSibling;
        if (!errorMessageElement || !errorMessageElement.classList.contains('error-message')) {
            errorMessageElement = document.createElement('div');
            errorMessageElement.classList.add('error-message');
            inputElement.insertAdjacentElement('afterend', errorMessageElement);
        }

        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }

    clearValidationError(inputElement) {
        inputElement.classList.remove('input-error');
        const errorMessageElement = inputElement.nextElementSibling;
        if (errorMessageElement && errorMessageElement.classList.contains('error-message')) {
            errorMessageElement.style.display = 'none';
            errorMessageElement.textContent = '';
        }
    }

    async createCategory(categoryName) {
        console.log(`Создание категории: ${categoryName}, тип: ${this.type}`);
        try {
            const endpoint = this.type === 'income' ? '/category/income' : '/category/expense';
            const result = await CustomHttp.request(config.host + endpoint , 'POST',
                {
                    title: categoryName,
                })

            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.redirectToCategoryPage(categoryName);
            }

        } catch (error) {
            console.log(error);
        }

    }

    redirectToCategoryPage(categoryName) {
        const redirectUrl = this.type === 'income' ? '/incomes' : '/expenses';
        this.updateCategoryPage(categoryName);
        window.location.href = redirectUrl;
    }

    updateCategoryPage(categoryName) {
        const categoriesKey = this.type === 'income' ? 'incomeCategories' : 'expenseCategories';
        let currentCategories = localStorage.getItem(categoriesKey);
        if (currentCategories) {
            try {
                currentCategories = JSON.parse(currentCategories);
            } catch (e) {
                console.error("Ошибка парсинга JSON, инициализация пустого массива.");
                currentCategories = [];
            }
        } else {
            currentCategories = [];
        }
        currentCategories.push(categoryName);
        localStorage.setItem(categoriesKey, JSON.stringify(currentCategories));
    }
}