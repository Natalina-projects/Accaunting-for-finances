import {Auth} from "../services/auth";

export class Sidebar {
    constructor() {
        this.categoryMenu = document.getElementById('home-collapse');
        this.categoryMenu.addEventListener('shown.bs.collapse', this.toggleShowActive.bind(this));
        this.categoryMenu.addEventListener('hidden.bs.collapse', this.toggleShowActive.bind(this));
        this.logoutButton = document.getElementById('logoutButton');

        this.collapseSidebarOnResize();
        this.setupUserName();

        if (this.logoutButton) {
            this.logoutButton.addEventListener('click', Auth.logout.bind(this));
        }

    }

    collapseSidebarOnResize() {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.menu-toggle');
        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('sidebar-hidden')) {
                sidebar.classList.remove('sidebar-hidden');
                sidebar.style.display = 'flex';
            } else {
                sidebar.classList.add('sidebar-hidden');
            }
        });
    }
    toggleShowActive() {
        const categoryBtn = document.getElementById('category-btn');
        if (this.categoryMenu.classList.contains('show')) {
            categoryBtn.classList.add('show-active');
        } else {
            categoryBtn.classList.remove('show-active');
        }

    }

    setupUserName() {
        const userNameSpan = document.getElementById('userNameSpan');
        const userName = localStorage.getItem('name');
        const userLastName = localStorage.getItem('lastName');

        if (userName && userLastName) {
            userNameSpan.textContent = `${userName} ${userLastName}`;
        } else {
            userNameSpan.textContent = 'Пользователь не найден';
        }
    }

}


