import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

export class MainChart {
    constructor() {
        this.incomesChart = document.getElementById('pie-chart');
        this.expensesChart = document.getElementById('pie-chart2');

        this.incomesChartData = {
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [100, 300, 100, 70, 200],
                backgroundColor: [
                    'rgb(220, 53, 69)',
                    'rgb(253, 126, 20)',
                    'rgb(255, 193, 7)',
                    'rgb(32, 201, 151)',
                    'rgb(13, 110, 253)'
                ],
                hoverOffset: 4,
            }]
        };

        this.expensesChartData = {
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue',
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 70, 100, 200, 100],
                backgroundColor: [
                    'rgb(220, 53, 69)',
                    'rgb(253, 126, 20)',
                    'rgb(255, 193, 7)',
                    'rgb(32, 201, 151)',
                    'rgb(13, 110, 253)'
                ],
                hoverOffset: 4
            }]
        };
        this.initCharts();
    }

    initCharts() {
        if (this.incomesChart) {
            new Chart(this.incomesChart, {
                type: 'pie',
                data: this.incomesChartData,
            });
        }

        if (this.expensesChart) {
            new Chart(this.expensesChart, {
                type: 'pie',
                data: this.expensesChartData,
            });
        }

    }
}


