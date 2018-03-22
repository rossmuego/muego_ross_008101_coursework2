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
var cookieParser = require('cookie-parser');
var session = require('express-session');
const Handlebars = require('handlebars');
var logged_in_user = 0;
var logged_in_username = ""

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    dbo.collection("posts").find({}).toArray(function(err, result) {
      if (err) throw err;
      dbo.collection("users").find({}).toArray(function(err, uresult) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < uresult.length; j++) {
            if (result[i].uid == uresult[j].uid) {
              result[i].forename = uresult[j].forename
              result[i].surname = uresult[j].surname
              result[i].opusr = uresult[j].username
            }
          }
        }
        res.render('home', {
          posts: result,
          liu: logged_in_username
        });
        db.close();
      });
    });
  })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/post/new', function(req, res) {
  res.render('createpost')
});

app.get('/user/:uid', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      username: req.params.uid
    };
    dbo.collection("users").find(query).toArray(function(err, uresult) {
      if (err) throw err;
      var user = {
        uid: uresult[0].uid
      }
      dbo.collection("posts").find(user).toArray(function(err, result) {
        if (err) throw err;
        res.render('user', {
          liu: logged_in_username,
          uid: uresult[0].uid,
          forename: uresult[0].forename,
          surname: uresult[0].surname,
          posts: result
        });
        db.close();
      });
    });
  })
});

app.get('/post/:pid', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      pid: parseInt(req.params.pid)
    };
    dbo.collection("posts").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.render('post', {
        liu: logged_in_username,
        pid: result[0].pid,
        title: result[0].title,
        content: result[0].content,
        uid: result[0].uid
      });
      db.close();
    });
  })
});

app.get('/login', function(req, res) {
  res.render('login', {
    liu: logged_in_username
  });
});

app.get('/registration', function(req, res) {
  res.render('registration', {
    liu: logged_in_username
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
        logged_in_user = result[0].uid
        logged_in_username = result[0].username;
        res.redirect('/user/' + result[0].username)
      }
      db.close();
    });
  });
});

app.post('/registration', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("40280659");
    var query = {
      username: req.body.username
    }
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.redirect('/')
      } else {
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          var myobj = {
            uid: result.length + 1,
            forename: req.body.forename,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password
          }
          dbo.collection("users").insertOne(myobj, function(err, result) {
            if (err) throw err;
            logged_in_username = myobj.username;
            res.redirect('/user/' + myobj.username)
            db.close();
          });
        });
      }
    });
  });
});

app.post('/post/new', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("40280659");

    dbo.collection("posts").find({}).toArray(function(err, result) {
      if (err) throw err;
      var myobj = {
        pid: result.length + 1,
        title: req.body.title,
        content: req.body.content,
        uid: logged_in_user,
      }
      dbo.collection("posts").insertOne(myobj, function(err, result) {
        if (err) throw err;
        res.redirect('/post/' + myobj.pid)
        db.close();
      });
    });

  });
});

app.listen(3000);
