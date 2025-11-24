// ------- SAMPLE STOCK DATA (Past 7 Days Closing Prices) -------
const stockData = {
    TCS: [3500, 3510, 3520, 3535, 3540, 3550, 3560],
    Infosys: [1400, 1410, 1420, 1435, 1445, 1450, 1460],
    Reliance: [2400, 2410, 2420, 2425, 2430, 2440, 2450],
    Wipro: [400, 402, 405, 407, 410, 411, 413],
    HDFC: [1500, 1505, 1510, 1518, 1525, 1530, 1538]
};

// ------- LINEAR PREDICTION FUNCTION -------
function predictNextValue(values) {
    let n = values.length;
    let x = [...Array(n).keys()];
    let y = values;

    let sumX = x.reduce((a, b) => a + b, 0);
    let sumY = y.reduce((a, b) => a + b, 0);
    let sumXY = x.map((v, i) => v * y[i]).reduce((a, b) => a + b, 0);
    let sumX2 = x.map(v => v * v).reduce((a, b) => a + b, 0);

    let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    return intercept + slope * n;
}

// ------- MAIN CALCULATION -------
function calculateRecommendation() {
    let amount = document.getElementById("amountInput").value;
    if (amount === "" || amount <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    let results = [];

    for (let company in stockData) {
        let pastPrices = stockData[company];
        let today = pastPrices[pastPrices.length - 1];
        let predicted = predictNextValue(pastPrices);

        let growth = ((predicted - today) / today) * 100;
        let shares = amount / today;
        let expectedProfit = shares * (predicted - today);

        results.push({
            company,
            today,
            predicted,
            growth: growth.toFixed(2),
            expectedProfit: expectedProfit.toFixed(2)
        });
    }

    // Sort by highest profit
    results.sort((a, b) => b.expectedProfit - a.expectedProfit);

    // Display result
    document.getElementById("resultBox").innerHTML = `
        <h3>Best Stock to Invest</h3>
        <p><b>${results[0].company}</b> is the best choice.</p>
        <p>Expected Profit: ₹${results[0].expectedProfit}</p>
        <p>Predicted Growth: ${results[0].growth}%</p>
    `;

    drawLineChart(results[0].company);
    drawBarChart(results);
}

// ------- LINE CHART -------
let lineChart;

function drawLineChart(company) {
    let ctx = document.getElementById("lineChart").getContext("2d");

    if (lineChart) lineChart.destroy();

    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
            datasets: [{
                label: company + " Last 7 Days",
                data: stockData[company],
                borderWidth: 2,
                borderColor: "blue",
                fill: false
            }]
        }
    });
}

// ------- BAR CHART -------
let barChart;

function drawBarChart(results) {
    let ctx = document.getElementById("barChart").getContext("2d");

    if (barChart) barChart.destroy();

    barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: results.map(r => r.company),
            datasets: [{
                label: "Expected Profit (₹)",
                data: results.map(r => r.expectedProfit),
                backgroundColor: ["red", "green", "blue", "orange", "purple"]
            }]
        }
    });
}

