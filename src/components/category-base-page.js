export class CategoryBasePage {
    constructor() {
        this.type = this.getCategoryTypeFromURL();
        this.cardsContainer = document.getElementById('cardsContainer');
        this.overlay = document.getElementById('overlay');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.popupMessage = document.querySelector('.popup p');
        this.cardElementToDelete = null;
        this.contentTitle = document.querySelector('.content-title');

        if (this.cardsContainer && this.overlay && this.yesBtn && this.noBtn && this.popupMessage) {
            this.loadCategories();
            this.initEventListeners();
        } else {
            console.error('Один или несколько элементов не найдены');
        }

    }

    getCategoryTypeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('type') || 'income';
    }

    loadCategories() {
        const categoriesKey = this.type === 'income' ? 'incomeCategories' : 'expenseCategories';
        const categories = JSON.parse(localStorage.getItem(categoriesKey)) || [];

        categories.forEach(category => {
            this.addCategoryCard(category);
        })

    }

    addCategoryCard(categoryName) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3 class="card-title">${categoryName}</h3>
            <div class="actions-btn">
                <a href="javascript:void(0)" class="btn btn-primary editBtn">Редактировать</a>
                <a href="javascript:void(0)" class="btn btn-danger deleteBtn">Удалить</a>
            </div>
        `;
        this.cardsContainer.insertBefore(card, this.cardsContainer.querySelector('.card-plus').parentNode);
    }

    initEventListeners() {
        this.cardsContainer.addEventListener('click', (e) => this.handleCardClick(e));
        this.yesBtn.addEventListener('click', () => this.handleYesBtnClick());
        this.noBtn.addEventListener('click', () => this.handleNoBtnClick());
    }

    handleCardClick(e) {
        if (e.target.classList.contains('deleteBtn')) {
            this.cardElementToDelete = e.target.closest('.card');
            const itemText = this.cardElementToDelete.querySelector('.card-title').textContent;
            const contentTitleText = this.contentTitle.textContent.toLowerCase();
            this.popupMessage.textContent = `Вы действительно хотите удалить категорию ${itemText}? Связанные ${contentTitleText} будут удалены навсегда.`;
            this.overlay.style.display = 'flex';
        } else if (e.target.classList.contains('editBtn')) {
            window.location.href = '/edit-incomes';
        } else if (e.target.classList.contains('card-plus')) {
            window.location.href = `/create-category?type=${this.type}`;
        }
    }

    handleYesBtnClick() {
        if (this.cardElementToDelete) {
            const categoryName = this.cardElementToDelete.querySelector('.card-title').textContent;
            const categoriesKey = this.type === 'income' ? 'incomeCategories' : 'expenseCategories';
            let categories = JSON.parse(localStorage.getItem(categoriesKey)) || [];

            categories = categories.filter(category => category !== categoryName);
            localStorage.setItem(categoriesKey, JSON.stringify(categories));

            this.cardElementToDelete.remove();
            this.overlay.style.display = 'none';
            this.cardElementToDelete = null;
        }
    }

    handleNoBtnClick() {
        this.overlay.style.display = 'none';
        this.cardElementToDelete = null;
    }
}