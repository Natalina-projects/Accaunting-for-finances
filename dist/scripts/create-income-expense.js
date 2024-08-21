import {Form} from "./form";

export class CreateIncomeExpense {
    constructor() {
        this.typeSelect = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.amountInput = document.getElementById('amount-input');
        this.dateInput = document.getElementById('date-input');
        this.commentInput = document.getElementById('comment-input');
        this.categories = {
            income: ['Депозиты', 'Зарплата', 'Сбережения', 'Инвестиции'],
            expense: ['Еда', 'Жильё', 'Здоровье', 'Кафе', 'Авто', 'Одежда', 'Развлечения', 'Счета', 'Спорт']
        };

        if (this.typeSelect && this.categorySelect && this.amountInput && this.dateInput && this.commentInput) {
            this.initEventListeners();
            this.setTypeFromURL();
        } else {
            console.error('Один или несколько элементов не найдены');
        }
    }

    initEventListeners() {
        this.typeSelect.addEventListener('change', () => this.handleTypeChange());

        const createBtn = document.querySelector('.create-btn');
        createBtn.addEventListener('click', (e) => this.handleCreate(e));
    }

    handleTypeChange() {
        this.categorySelect.innerHTML = '<option value="">Категория...</option>';
        const selectedType = this.typeSelect.value;
        const options = this.categories[selectedType];

        if (options) {
            options.forEach((category) => {
                const option = new Option(category, category);
                this.categorySelect.add(option);
            });
        }
    }

    setTypeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        if (type) {
            this.typeSelect.value = type;
            this.handleTypeChange();
        }
    }

    async handleCreate(e) {
        e.preventDefault();

        const type = this.typeSelect.value;
        const category = this.categorySelect.value;
        const amount = this.amountInput.value;
        const date = this.dateInput.value;
        const comment = this.commentInput.value;

        if (!Form.isAuthenticated()) {
            alert('Вы не авторизованы! Пожалуйста, войдите заново!');
            window.location.href = '/login';
            return;
        }

        if (type && category && amount && date) {

            let token = localStorage.getItem('authToken');


            try {
                let response = await fetch('http://localhost:3000/api/operations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        type: type,
                        amount: Number(amount),
                        date: date,
                        comment: comment,
                        category: category
                    })
                });

                if (!response.ok) {
                    throw new Error('Ошибка при создании записи');

                }

                const result = await response.json();
                console.log('Операция успешно сохранена', result);

                localStorage.setItem('newOperation', JSON.stringify(result));

                window.location.href = '/incomes-expenses';
            } catch (error) {
                console.error('Ошибка', error);
                alert('Не удалось создать запись!');
            }
        } else {
            alert('Заполните все обязательные поля!')
        }
    }
}







