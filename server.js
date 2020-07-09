const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');

var db = knex ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'easybank'
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello");
})

app.post('/invite', (req, res) => {

     res.send(req.body);

    db('invites').insert({
        name:req.body.name,
        email:req.body.email
    }).then(console.log)
    .catch(err=>res.status(400).json(err))
})

app.listen(process.env.PORT || 3000);