export class IncomesExpenses {
    constructor() {
        this.table = document.getElementById('table');
        this.overlay = document.getElementById('overlay');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.popupMessage = document.querySelector('.popup p');

        if(this.table && this.overlay && this.yesBtn && this.noBtn && this.popupMessage) {
            this.initEventListeners();
        } else {
            console.error('Один или несколько элементов не найдены');
        }


    }

    initEventListeners() {
        this.table.addEventListener('click', (e) => this.handleTableClick(e));
        this.yesBtn.addEventListener('click', () => this.handleYesBtnClick());
        this.noBtn.addEventListener('click', () => this.handleNoBtnClick());
    }

    handleTableClick(e) {
        if (e.target.classList.contains('delete-icon')) {
            e.target.closest('tr');
            this.popupMessage.textContent = `Вы действительно хотите удалить операцию?`;
            this.overlay.style.display = 'flex';
        } else if (e.target.classList.contains('edit-icon')) {
            window.location.href = '/edit-income-expense';
        }
    }

    handleYesBtnClick() {
        this.yesBtn.addEventListener('click', function() {
            console.log('Удалено');
            this.overlay.style.display = 'none';
        });

    }

    handleNoBtnClick() {
        this.noBtn.addEventListener('click', function() {
            this.overlay.style.display = 'none';
        });
    }
}





