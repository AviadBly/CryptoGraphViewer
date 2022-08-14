'use strict';
var express = require('express');
var router = express.Router();
var app = express();
const axios = require('axios');
const fs = require('fs');
const BTCData = require('./../BTC.json'); 
const ETHData = require('./../ETH.json'); 
const BNBData = require('./../BNB.json');


module.exports = router;

//This function was used to write the json Data to file.
//('BTC' can be replaced by any other coin name)
function jsonToFile(data) { 
    fs.writeFile('BTC.json', data, (err) => {
        if (err) {
            throw err;

        }
    });
}


//This function was used to get the data inside JSON files (BTC,ETH,BNB)
//Value: (BTC,BNB,ETH)
async function getTimeSeriesAxios(value) {
    return await axios
        .get('https://rest.coinapi.io/v1/exchangerate/' + value + '/USD/history?period_id=1DAY&time_start=2021-01-01T00:00:00&time_end=2021-12-29&limit=500', { headers: { 'X-CoinAPI-Key': "3DC3B57D-5BB2-4188-9C39-7DB8E4EA1764" } });
}

//FrontEnd will send Axios request, and will get the data according to requested coin.
(async () => {
    router.get('/BTC', async function (req, res) {
        res.send(BTCData);
    });
    router.get('/ETH', async function (req, res) {
        res.send(ETHData);
    });
    router.get('/BNB', async function (req, res) {
       res.send(BNBData)
    });
})()