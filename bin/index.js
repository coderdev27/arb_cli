#! /usr/bin/env node
import fetch from "node-fetch";
import chalk from 'chalk';


const data = async (tickerftx,tickerbinance) => {
    try {
        const ftx = await fetch(`https://ftx.com/api/markets/${tickerftx}`);
        const ftxbtc = await ftx.json();
        const ftxprice = ftxbtc.result.price

        
        const binance = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${tickerbinance}`);
        const bdata = await binance.json();
        const binanceprice = bdata.price

        const diff = ftxprice-binanceprice
        const diff_ftx = binanceprice-ftxprice

if (ftxprice > binanceprice ) {                                                            
    console.log(chalk.bgGreen(chalk.black(`Buy on binance ${bdata.symbol} - ${binanceprice} and sell on ftx ${ftxbtc.result.name} - ${ftxprice}. Arb percent is ${(diff/ftxprice) * 100}% `)))
    console.log(``);
}else if (ftxprice < binanceprice){
    console.log(chalk.bgGreen(chalk.black(`Buy on ftx ${ftxbtc.result.name} - ${ftxprice} and sell on binance ${bdata.symbol} - ${binanceprice}. Arb percent is ${(diff_ftx/binanceprice) * 100}% `)));
    console.log(``);
}
else {
    console.log(chalk.bgRed(chalk.black(`No arbitrage opportunity`)));
    console.log(``);
}



    } catch (error) {
        console.log(error);
    }

}


//send ftx ticker name like this BTC/USD
//send binance ticker like this BTCUSDT

 data("BTC/USD","BTCUSDT")

setInterval(() => {
    data("BTC/USD","BTCUSDT")
}, 1000);

