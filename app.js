var express = require('express');
const { Client } = require('pg');

app = express();

app.get('/', async function (req, res) {
    console.log('JesseDbConfig: ', process.env['jesse-db-config']);
    const client = new Client({
        connectionString: process.env['jesse-db-config'],
        ssl: false,
    })
    await client.connect()
    const response = await client.query('SELECT $1::text as message', ['Hello data!'])
    const stuff = response.rows[0].message // Hello world!
    await client.end()
    
    res.send(`Hello World! - Data: ${stuff}!\n`);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
