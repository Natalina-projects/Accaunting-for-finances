export class CreateIncomeExpense {
    constructor() {
        this.typeSelect = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.categories = {
            income: ['Депозиты','Зарплата', 'Сбережения', 'Инвестиции'],
            expense: ['Еда','Жильё', 'Здоровье', 'Кафе', 'Авто', 'Одежда', 'Развлечения', 'Счета', 'Спорт']
        };

        if (this.typeSelect && this.categorySelect) {
            this.initEventListeners();
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

        if (options) {
            options.forEach((category) => {
                const option = new Option(category, category);
                this.categorySelect.add(option);
            });
        }
    }
}







