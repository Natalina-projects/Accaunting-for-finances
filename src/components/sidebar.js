export class Sidebar {
    constructor() {
        this.categoryMenu = document.getElementById('home-collapse');
        this.categoryMenu.addEventListener('shown.bs.collapse', this.toggleShowActive);
        this.categoryMenu.addEventListener('hidden.bs.collapse', this.toggleShowActive);

        this.collapseSidebarOnResize();

    }

    collapseSidebarOnResize() {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.menu-toggle');
        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('sidebar-hidden')) {
                sidebar.classList.remove('sidebar-hidden');
                sidebar.style.display.flex;
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

}


