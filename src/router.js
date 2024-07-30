import {MainChart} from "./components/main-chart";
import {Form} from "./components/form";
import {IncomesExpenses} from "./components/incomes-expenses";
import {CategoryBasePage} from "./components/category-base-page";
import {CreateIncomeExpense} from "./components/create-income-expense";

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
                load: () => {

                }

            },
            {
                route: '/main',
                title: 'Главная',
                template: 'templates/main.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new MainChart();
                }

            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                template: 'templates/sign-up.html',
                load: () => {
                    new Form();
                }

            },
            {
                route: '/login',
                title: 'Авторизация',
                template: 'templates/login.html',
                load: () => {
                    new Form();
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
                load: () => {

                }

            },
            {
                route: '/edit-expenses',
                title: 'Редактирование расходов',
                template: 'templates/edit-expenses.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {

                }

            },
            {
                route: '/edit-income-expense',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-income-expense.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {

                }

            },
            {
                route: '/create-incomes',
                title: 'Создание доходов',
                template: 'templates/create-incomes.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {

                }

            },
            {
                route: '/create-expenses',
                title: 'Создание расходов',
                template: 'templates/create-expenses.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {

                }

            },
            {
                route: '/create-income-expense',
                title: 'Создание категории дохода/расхода',
                template: 'templates/create-income-expense.html',
                useSidebar: 'templates/sidebar.html',
                load: () => {
                    new CreateIncomeExpense;
                }

            },
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute() {
        const urlRoute = window.location.pathname;

        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }

            if (newRoute.useSidebar) {
                this.contentPageElement.innerHTML = newRoute.useSidebar;
            }

            if (newRoute.template) {
                this.contentPageElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
            }

        } else {
            console.log('No route found');
            window.location.href = '/';
        }





        newRoute.load();
    }
}