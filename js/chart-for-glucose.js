const ctx = document.getElementById('index-glucose-chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['09:15', '12:00', '22:00'],
        // , '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'
        datasets: [{
            label: '# of Votes',
            data: [5.3, 6, 5.5],
            backgroundColor: 'transparent',
            borderColor: 'rgb(0, 126, 126)',
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});