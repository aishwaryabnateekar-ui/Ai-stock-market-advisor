window.onload = function () {
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Infosys',
          data: [1410, 1420, 1430, 1440, 1450, 1460, 1480],
          backgroundColor: 'rgba(126,217,87,0.8)'
        },
        {
          label: 'TCS',
          data: [3250, 3260, 3275, 3285, 3300, 3320, 3350],
          backgroundColor: 'rgba(68,170,255,0.7)'
        },
        {
          label: 'Reliance',
          data: [2350, 2365, 2375, 2390, 2410, 2430, 2450],
          backgroundColor: 'rgba(219,180,92,0.8)'
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          grid: { color: '#224d35' }
        },
        y: {
          grid: { color: '#224d35' }
        }
      }
    }
  });
};

