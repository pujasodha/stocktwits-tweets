const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

stocktwitsRouter = require('./routes/api/stocktwits');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/express', (req, res) => {
    res.send({ express: `Express Working!` });
});

app.post('/api/hello', (req, res) => {
    console.log(req.body);
    res.send(`Recieved POST Request: ${req.body.post}`);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/stocktwits', stocktwitsRouter);

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
