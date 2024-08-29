const express = require('express')
const bodyParser = require('body-parser')
const bcrpty = require('bcrypt')
const session = require('express-session')
const app = express()
const db = require('./config/db.js')
const { create } = require('domain')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'sifra',
    resave: true,
    saveUninitialized: true
}));


app.post('/login', (req, res) =>{
    let body = req.body;
    db.user.findAll().then(async (users) =>{
        let user = users.find(k => k.username === body.username);
        if(user === undefined){
            res.status(401).json({ error: 'Login failed'});
        }else{
            const correctPassword = body.password === korisnik.password;
            if(correctPassword){
                req.session.username = korisnik.username;
                res.status(200).json({ message: 'Login succesfull' });
            }else{
                req.status(401).json({ error: 'Login unsuccesfull' });
            }
        }
    });
});


app.post('/logout', (req,res) =>{
    if(req.session.username != null){
        req.session.destroy();
        res.status(200).json({message: 'Logout succesfull'});
    }else{
        req.status(401).json({message: 'Unauthorized access'});
    }
});

app.listen();