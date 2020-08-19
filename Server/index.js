const express = require('express');
const app = express();
const fs = require("fs").promises;


app.use(express.json());

let records = [];


app.post('/records', (req, res) =>{
    records.push(req.body);
    res.send(req.body);
});

app.get('/records', (req, res) => {
    res.send(products);
});

app.listen(8080);