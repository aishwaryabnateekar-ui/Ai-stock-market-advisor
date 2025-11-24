// Sample stock price history (last 7 days)
const stockData = {
    "TCS": [3400, 3420, 3440, 3450, 3470, 3480, 3500],
    "Infosys": [1350, 1365, 1370, 1380, 1390, 1400, 1420],
    "Reliance": [2300, 2310, 2325, 2335, 2340, 2350, 2360],
    "HDFC Bank": [1500, 1510, 1520, 1530, 1545, 1550, 1560],
    "Wipro": [420, 422, 424, 425, 426, 428, 430]
};

// Predict next price using simple trend formula
function predictNextPrice(prices) {
    let last = prices[prices.length - 1];
    let secondLast = prices[prices.length - 2];
    return last + (last - secondLast);  // Simple linear trend
}

function calculateRecommendation() {
    let amount = document.getElementById("amountInput").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let results = [];

    for (let company in stockData) {
        let prices = stockData[company];
        let today = prices[prices.length - 1];
        let predicted = predictNextPrice(prices);

        let growth = ((predicted - today) / today) * 100;

        let shares = Math.floor(amount / today);
        let expectedProfit = shares * (predicted - today);

        results.push({
            company,
            today,
            predicted,
            growth,
            expectedProfit
        });
    }

    results.sort((a, b) => b.expectedProfit - a.expectedProfit);

    const best = results[0];

    document.getElementById("resultBox").innerHTML = `
        <h3>Best Investment: ${best.company}</h3>
        <p>Predicted Growth: <b>${best.growth.toFixed(2)}%</b></p>
        <p>Expected Profit on ₹${amount}: <b>₹${best.expectedProfit.toFixed(2)}</b></p>
    `;

    drawLineChart(stockData);
    drawBarChart(results);
}

// Line Chart – Price Trend
function drawLineChart(data) {
    const ctx = document.getElementById("lineChart").getContext("2d");

    if (window.lineGraph) window.lineGraph.destroy();

    window.lineGraph = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Day 1", "2", "3", "4", "5", "6", "7"],
            datasets: Object.keys(data).map(company => ({
                label: company,
                data: data[company],
                borderWidth: 2,
                fill: false
            }))
        }
    });
}

// Bar Chart – Profit Comparison
function drawBarChart(results) {
    const ctx = document.getElementById("barChart").getContext("2d");

    if (window.barGraph) window.barGraph.destroy();

    window.barGraph = new Chart(ctx, {
        type: "bar",
        data: {
            labels: results.map(r => r.company),
            datasets: [{
                label: "Expected Profit (₹)",
                data: results.map(r => r.expectedProfit),
                borderWidth: 1
            }]
        }
    });
}
