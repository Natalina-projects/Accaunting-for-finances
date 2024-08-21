import {MainChart} from "./components/main-chart";
import {Form} from "./components/form";
import {IncomesExpenses} from "./components/incomes-expenses";
import {CategoryBasePage} from "./components/category-base-page";
import {CreateIncomeExpense} from "./components/create-income-expense";
import {Sidebar} from "./components/sidebar";
import {EditIncomeExpense} from "./components/edit-income-expense";
import {CreateCategory} from "./components/create-category";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                template: 'templates/index.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new MainChart();
                }

            },
            {
                route: '/signup',
                title: 'Регистрация',
                template: 'templates/sign-up.html',
                load: () => {
                    new Form('signup');
                }

            },
            {
                route: '/login',
                title: 'Авторизация',
                template: 'templates/login.html',
                load: () => {
                    new Form('login');
                }

            },
            {
                route: '/incomes-expenses',
                title: 'Доходы и расходы',
                template: 'templates/incomes-expenses.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new IncomesExpenses();
                }

            },
            {
                route: '/incomes',
                title: 'Доходы',
                template: 'templates/incomes.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new CategoryBasePage();
                }
            },
            {
                route: '/expenses',
                title: 'Расходы',
                template: 'templates/expenses.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new CategoryBasePage();
                }

            },
            {
                route: '/edit-incomes',
                title: 'Редактирование доходов',
                template: 'templates/edit-incomes.html',
                useSidebar: 'templates/sidebar.html',
            },
            {
                route: '/edit-expenses',
                title: 'Редактирование расходов',
                template: 'templates/edit-expenses.html',
                useSidebar: 'templates/sidebar.html',
            },
            {
                route: '/edit-income-expense',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-income-expense.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new EditIncomeExpense();
                }
            },
            {
                route: '/create-category',
                title: 'Создание категории',
                template: 'templates/create-category.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new CreateCategory();
                }
            },
            {
                route: '/create-income-expense',
                title: 'Создание операции дохода/расхода',
                template: 'templates/create-income-expense.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new CreateIncomeExpense();
                }

            },
            {
                route: '/logout',
                title: 'Выход',
                template: null,
                load: () => {
                    Form.logout();
                }
            }
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute() {
        let urlRoute = window.location.pathname;

        if (!Form.isAuthenticated() && urlRoute === '/' || urlRoute === '') {
            urlRoute = '/login';
            window.history.replaceState({}, '', urlRoute);
        }

        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }

            let mainContentHTML = '';

            if (newRoute.template) {
                try {
                    mainContentHTML = await fetch(newRoute.template).then(response => response.text());
                } catch (error) {
                    console.error(`Ошибка загрузки страницы: ${newRoute.template}`, error);
                }

            }

            if (newRoute.useSidebar) {
                try {
                    const sidebarHTML = await fetch(newRoute.useSidebar).then(response => response.text());
                    this.contentPageElement.innerHTML = `
                    <div class="sidebar">
                        ${sidebarHTML}
                    </div>
                    <div class="main-content">
                        ${mainContentHTML}
                    </div>
                `;
                    new Sidebar();
                } catch (error) {
                    console.error(`Ошибка при загрузке сайдбара: ${newRoute.useSidebar}`, error);
                }

            } else {
                this.contentPageElement.innerHTML = mainContentHTML;
            }

            if (newRoute.load) {
                try {
                    newRoute.load()
                } catch (error) {
                    console.error(`Ошибка при загрузке роута: ${newRoute.route}`, error);
                }

            }

        } else {
            console.log('No route found');
            window.location.href = '/';
        }


    }
}