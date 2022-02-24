async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch(
        'https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=fceca6ee67d64529a77916994d3e2650'
    )
    let jsonRepsonse = await response.json()    
    const {GME, MSFT, DIS, BNTX} = jsonRepsonse;
    const stocks = [GME, MSFT, DIS, BNTX]

    stocks.forEach(stock => stock.values.reverse())

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function getHighest(stock){
        let newInfo = stock.values;
        let highValue = 0;

        for(let i = 0; i < newInfo.length; i++){
            let newValue = parseFloat(stock.values[i].high);
            if(newValue > highValue){
                highValue = newValue;
            }
        }
        return highValue
    }
    function getAverage(stock){
        let newInfo = stock.values;
        let valueSum = 0;

        for(let i = 0; i < newInfo.length; i++){
            let newValue = parseFloat(stock.values[i].high);
            valueSum += newValue;
        }
        return valueSum/newInfo.length
    }

}

main()
