var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'xxxxx', //email user
        pass: 'xxxxxx' // password user
    }
})

app.post('/sendEmail', (req, res) => {
    let email = {
        from: req.body.email,
        to: 'xxxxx', //destiny email
        subject: 'Assunto',
        html: req.body.message
    }
    transport.sendMail(email, (err, info) => {
        if (err) {
            throw console.log(err.message);
        }
        console.log('email enviado')
    })
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Server is running on ${port} !`)
})