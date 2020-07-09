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
    let totalData = 0
    // const user = {
    //     name: 'sally',
    //     email: 'email'
    // }
    // res.send(user);
    // console.log('1')
   //res.send("helloo");
   // console.log(`App running on port`);
    //res.send(req.body);
     db('invites').count('serial as CNT').then(function(total){
        totalData = total[0].CNT
     })
     console.log("Data:",totalData);

    db('invites').insert({
        serial:totalData + 1,
        name:req.body.name,
        email:req.body.email
    }).then(res.status(200).json("Success! Invite will be sent :)"))
    .catch(err=>res.status(400).json(err))
})

app.listen(process.env.PORT || 3000);