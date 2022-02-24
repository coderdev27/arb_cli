import fetch from "node-fetch";


const data = async () => {
    try {
        const ftx = await fetch('https://ftx.com/api/markets/BTC/USD');
        const ftxbtc = await ftx.json();
        const ftxprice = ftxbtc.result.price

        
        const binance = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const bdata = await binance.json();
        const binanceprice = bdata.price

        const diff = ftxprice-binanceprice
// console.log(`${binanceprice/100*1}`);
//console.log(diff);
if (ftxprice > binanceprice ) {                                                             
    console.log(`Buy on binance ${binanceprice} and sell on ftx ${ftxprice}. Arb percent is ${(diff/ftxprice) * 100}%`);
} else if (ftxprice > binanceprice){
    console.log(`Buy on ftx ${ftxprice} and sell on binance ${binanceprice}. Arb percent is ${(diff/binanceprice) * 100}%`);
}
else {
    console.log(`No arbitrage opportunity`);
}



    } catch (error) {
        console.log(error);
    }

}


// setInterval(() => {
//     data()
// }, 1000);