const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

require('./routes/api/stocktwits')(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors);

app.get('/api/express', (req, res) => {
    res.send({ express: `Express Working!` });
});

app.post('/api/hello', (req, res) => {
    console.log(req.body);
    res.send(`Recieved POST Request: ${req.body.symbol}`);
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
