var express = require('express');
var exphbs = require('express-handlebars');
var url = require('url');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var app = express();
var bcrypt = require('bcrypt');
const path = require('path');
var bodyParser = require("body-parser");

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  res.render('home');
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/profile', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      uid: parseInt(req.query.uid)
    };
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.render('profile', result[0]);
      db.close();
    });
  })
});

app.get('/post', function(req, res) {
  res.render('post');
});

app.get('/login', function(req, res) {
  res.render('login', {
    layout: 'login'
  });
});

app.get('/registration', function(req, res) {
  res.render('registration', {
    layout: 'login'
  });
});

app.post('/login', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      username: req.body.username,
      password: req.body.password
    };
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      if (result.length == 0) {
        res.redirect('/')
      } else {
        res.redirect('/profile?uid=' + result[0].uid)
      }
      db.close();
    });
  })
});

app.post('/registration', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var myobj = {
      uid: parseInt(req.body.uid),
      forename: req.body.forename,
      surname: req.body.surname,
      username: req.body.username,
      password: req.body.password
    };
    dbo.collection("users").insertOne(myobj, function(err, result) {
      if (err) throw err;
      res.redirect('/profile?uid=' + req.body.uid)
      db.close();
    });
  });
});

app.listen(3000);
