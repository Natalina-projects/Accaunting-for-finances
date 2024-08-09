export class CategoryBasePage {
    constructor() {
        this.cardsContainer = document.getElementById('cardsContainer');
        this.overlay = document.getElementById('overlay');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.popupMessage = document.querySelector('.popup p');
        this.cardElementToDelete = null;

        if (this.cardsContainer && this.overlay && this.yesBtn && this.noBtn && this.popupMessage) {
            this.initEventListeners();
        } else {
            console.error('Один или несколько элементов не найдены');
        }

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
            this.popupMessage.textContent = `Вы действительно хотите удалить категорию ${itemText}? Связанные доходы будут удалены навсегда.`;
            this.overlay.style.display = 'flex';
        } else if (e.target.classList.contains('editBtn')) {
            window.location.href = '/edit-incomes';
        } else if (e.target.classList.contains('card-plus')) {
            window.location.href = '/create-incomes';
        }
    }

    handleYesBtnClick() {
        if (this.cardElementToDelete) {
            console.log('Удалено');
            this.cardElementToDelete.remove();
            document.getElementById('overlay').style.display = 'none';
            this.cardElementToDelete = null;
        }


    }

    handleNoBtnClick() {
        this.overlay.style.display = 'none';
        this.cardElementToDelete = null;
    }
}
