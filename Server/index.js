const express = require('express');
const app = express();

const fs = require("fs").promises;


app.use(express.json());




app.post('/api/v1/post', async (req, res) =>{
    let data = req.body;
    let file = await fs.readFile('records.json');
    file = JSON.parse(file);
    file.push(data);
    fs.writeFile('records.json',JSON.stringify(file));
    res.send("success");
});

app.get('/api/v1/records', async (req, res) => {
    let data = await fs.readFile('records.json');
    data = JSON.parse(data);
    res.send(data);
});

app.listen(8080);