const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));

app.use(express.static("public"));

app.use(routes);

app.get('/about',(req,res) => {
    res.sendFile(__dirname + '/page/about.html');
});

app.get('/career',(req,res) => {
    res.sendFile(__dirname + '/page/career.html');
});

app.get('/contact',(req,res) => {
    res.sendFile(__dirname + '/page/contact.html');
});

app.use((err, req, res, next) => {
    // console.log(err);
    return res.send('Internal Server Error');
});


app.listen(process.env.PORT||3000, () => console.log('Server is running on port 3000'));