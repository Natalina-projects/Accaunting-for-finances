export class EditIncomeExpense {
    constructor() {
        this.typeSelect = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.amountInput = document.querySelector('.amount');
        this.dateInput = document.querySelector('.date');
        this.commentInput = document.querySelector('.comment');
        this.categories = {
            income: ['Депозиты', 'Зарплата', 'Сбережения', 'Инвестиции'],
            expense: ['Еда', 'Жильё', 'Здоровье', 'Кафе', 'Авто', 'Одежда', 'Развлечения', 'Счета', 'Спорт']
        };

        if (this.typeSelect && this.categorySelect && this.amountInput && this.dateInput && this.commentInput) {
            this.initEventListeners();
            this.setFormDataFromURL();
        } else {
            console.error('Один или несколько элементов не найдены');
        }
    }

    initEventListeners() {
        this.typeSelect.addEventListener('change', () => this.handleTypeChange());
    }

    handleTypeChange() {
        this.categorySelect.innerHTML = '<option value="">Категория...</option>';
        const selectedType = this.typeSelect.value;
        const options = this.categories[selectedType];

        if(options) {
            options.forEach((category) => {
                const option = new Option(category, category);
                this.categorySelect.add(option);
            });
        }
    }

    setFormDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        const category = urlParams.get('category');
        const amount = urlParams.get('amount');
        const date = urlParams.get('date');
        const comment = urlParams.get('comment');

        if (type) {
            this.typeSelect.value = type;
            this.handleTypeChange();
        }

        if (category) {
            this.categorySelect.value = category;
        }

        if (amount) {
            this.amountInput.value = amount;
        }

        if (date) {
            this.dateInput.value = date;
        }

        if (comment) {
            this.commentInput.value = comment;
        }

    }

}