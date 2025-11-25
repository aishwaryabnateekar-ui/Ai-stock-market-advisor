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
        x: { grid: { color: '#224d35' } },
        y: { grid: { color: '#224d35' } }
      }
    }
  });
};

function calculate() {
  // Get entered value
  var investment = parseFloat(document.getElementById('investment').value);
  // Example mock calculation for Infosys
  if (!isNaN(investment) && investment > 0) {
    // Sample values; customize your logic here
    var profit = (investment * 0.083).toFixed(2);
    var growth = "0.83%"; // This can also be calculated dynamically
    var stock = "Infosys";
    var resultHTML = `
      <h3>Best Stock to Invest</h3>
      <p><strong>${stock}</strong> is the best choice.</p>
      <p>Expected Profit: ₹${profit}</p>
      <p>Predicted Growth: ${growth}</p>
    `;
    document.getElementById('result').innerHTML = resultHTML;
  } else {
    document.getElementById('result').innerHTML = `
      <h3>Error</h3>
      <p>Please enter a valid investment amount.</p>
    `;
  }
}
// Moderate Growth Values (15–25%)
let growthRates = {
    "HDFC Bank": 15,
    "ICICI Bank": 17,
    "Reliance": 18,
    "TCS": 20,
    "Infosys": 19,
    "Airtel": 17,
    "Asian Paints": 18
};

let chart; // Global chart object

function calculateReturns() {
    let investment = parseFloat(document.getElementById("amount").value);
    let company = document.getElementById("company").value;

    if (!investment || investment <= 0) {
        document.getElementById("result").innerHTML = "Enter valid amount!";
        return;
    }

    let growth = growthRates[company];

    // Annual profit
    let yearlyProfit = investment * (growth / 100);
    let monthlyProfit = yearlyProfit / 12;
    let dailyProfit = yearlyProfit / 365;
    let totalAmount = investment + yearlyProfit;

    // Display result text
    document.getElementById("result").innerHTML = `
        <strong>Best Stock to Invest:</strong><br>
        ${company}<br><br>

        <strong>Expected Annual Profit:</strong> ₹${yearlyProfit.toFixed(2)}<br>
        <strong>Total After 1 Year:</strong> ₹${totalAmount.toFixed(2)}<br>
        <strong>Monthly Profit:</strong> ₹${monthlyProfit.toFixed(2)}<br>
        <strong>Daily Profit:</strong> ₹${dailyProfit.toFixed(2)}<br>
        <strong>Annual Growth:</strong> ${growth}%
    `;

    // Show updated graph
    showGrowthChart(investment, yearlyProfit);
}


// 📈 Create Monthly Growth Chart (12 months)
function showGrowthChart(investment, yearlyProfit) {
    const monthlyProfit = yearlyProfit / 12;

    let months = [];
    let values = [];
    let currentValue = investment;

    for (let i = 1; i <= 12; i++) {
        currentValue += monthlyProfit;
        months.push("Month " + i);
        values.push(currentValue.toFixed(2));
    }

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById("growthChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: months,
            datasets: [{
                label: "Portfolio Value Over 12 Months",
                data: values,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
}
