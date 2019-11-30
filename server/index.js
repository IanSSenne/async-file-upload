const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const port = 3000
app.use(bodyParser.raw());
app.use(express.static('../client'));

app.post('/upload', (req, res) => {
    const fileName = req.headers['x-file-name'];
    const binData = req.body;
    fs.writeFile('./files/' + fileName, binData, (err) => {
        if (err) {
            res.sendStatus(500);//internal server error;
        } else {
            res.sendStatus(200);//all good
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));