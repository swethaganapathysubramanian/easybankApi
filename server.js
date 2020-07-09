const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');

var db = knex ({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello");
})


app.post('/invite', (req, res) => {

    db('invites').insert({
        name:req.body.name,
        email:req.body.email
    }).then((res) => res.status(200).json("Success! Invite will be sent :)"))
    .catch(err=>res.status(400).json(err))
})

app.listen(process.env.PORT || 3000);