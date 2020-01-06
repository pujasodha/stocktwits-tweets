const fetch = require('node-fetch');
const request = require('request');
const axios = require('axios');

module.exports = (app) => {
    let symbol;

    app.post('/search-symbol', (req, res) => {
        symbol = req.body.symbol;
        res.redirect('/symbol-tweets');
    });

    app.get('/search/:symbol', async (req, res) => {
        const symbol = req.params.symbol;
        axios
            .get(`https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`)
            .then((response) => {
                res.json(response.symbol);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(req.params.symbol);
    });
};
