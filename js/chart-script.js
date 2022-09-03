const glucose = document.getElementById('glucose-chart').getContext('2d');
const weight = document.getElementById('weight-chart').getContext('2d');
Chart.defaults.font.size = 14;

let levelArray = [5.5, 4.2];
let dateArray = ["9:20","21:39"];

let weightArray = [64, 63];
let dateWeightArray = ["02.08.2022, 19:30","04.08.2022, 20:00"];

let glucoseChart = new Chart(glucose, {
    type: 'bar',
    data: {
        labels: dateArray,
        datasets: [{
            label: 'Уровень глюкозы (ммоль/л)',
            data: levelArray,
            backgroundColor: [
                'rgb(0, 126, 126)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,                        
                    }
                },                
            }
        }
    }
});

let weightChart = new Chart(weight, {
    type: 'bar',
    data: {
        labels: dateWeightArray,
        datasets: [{
            label: 'Уровень глюкозы (ммоль/л)',
            data: weightArray,
            backgroundColor: [
                'rgb(0, 126, 126)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,                        
                    }
                },                
            }
        }
    }
});

