export class IncomesExpenses {
    constructor() {
        this.table = document.getElementById('table');
        this.overlay = document.getElementById('overlay');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.popupMessage = document.querySelector('.popup p');
        this.rowToDelete = null;

        if(this.table && this.overlay && this.yesBtn && this.noBtn && this.popupMessage) {
            this.initEventListeners();
            this.checkForNewOperation();
        } else {
            console.error('Один или несколько элементов не найдены');
        }


    }

    initEventListeners() {
        this.table.addEventListener('click', (e) => this.handleTableClick(e));
        this.yesBtn.addEventListener('click', () => this.handleYesBtnClick());
        this.noBtn.addEventListener('click', () => this.handleNoBtnClick());
    }

    checkForNewOperation() {
        const newOperation = localStorage.getItem('newOperation');
        if (newOperation) {
            const operation = JSON.parse(newOperation);
            this.addOperationToTable(operation);
            localStorage.removeItem('newOperation');
        }
    }

    addOperationToTable(operation) {
        const newRow = this.table.insertRow();
        newRow.innerHTML = `
            <th scope="row">${operation.id}</th>
            <td>${operation.type}</td>
            <td>${operation.category}</td>
            <td>${operation.amount}$</td>
            <td>${operation.date}</td>
            <td>${operation.comment || ''}</td>
            <td>
                <i class="fas fa-trash-alt delete-icon"></i>
                <i class="fas fa-edit edit-icon"></i>
            </td>
        `
    }

    handleTableClick(e) {
        if (e.target.classList.contains('delete-icon')) {
            this.rowToDelete = e.target.closest('tr');
            this.popupMessage.textContent = `Вы действительно хотите удалить операцию?`;
            this.overlay.style.display = 'flex';
        } else if (e.target.classList.contains('edit-icon')) {
            const row = e.target.closest('tr');
            const type = row.querySelector('td:nth-child(2)').textContent.trim();
            const category = row.querySelector('td:nth-child(3)').textContent.trim();
            const amount = row.querySelector('td:nth-child(4)').textContent.replace('$', '').trim();
            const date = row.querySelector('td:nth-child(5)').textContent.trim();
            const comment = row.querySelector('td:nth-child(6)').textContent.trim();

            const params = new URLSearchParams({
                type: type,
                category: category,
                amount: amount,
                date: date,
                comment: comment

            });

            window.location.href = `/edit-income-expense?${params.toString()}`;
        }
    }

    handleYesBtnClick() {
        if (this.rowToDelete) {
            console.log('Операция успешно удалена');
            this.rowToDelete.remove();
            this.overlay.style.display = 'none';
            this.rowToDelete = null;
        }

    }

    handleNoBtnClick() {
        this.overlay.style.display = 'none';
        this.rowToDelete = null;
    }


}





