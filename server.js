const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/express', (req, res) => {
    res.send({ express: `Express Working!` });
});

app.post('/api/hello', (req, res) => {
    console.log(req.body);
    res.send(`Recieved POST Request: ${req.body.post}`);
});

app.listen(PORT, () => console.log(`Listening: http://localhost:${PORT}`));
