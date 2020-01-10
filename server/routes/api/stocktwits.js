const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/:symbol', function(req, res) {
    const symbol = req.params.symbol;
    // console.log(symbol);
    const apiUrl = `https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`;
    var data = {};
    axios
        .get(apiUrl)
        .then((response) => {
            data[symbol] = response.data.messages;
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;
