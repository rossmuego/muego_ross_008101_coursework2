/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  dbo.createCollection("posts", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = { id: 2, forename: "Isla", surname: "Dracup" };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  dbo.collection("users").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
})

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  dbo.collection("posts").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
})

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = [{
      uid: 1,
      forename: 'Ross',
      surname: 'Muego',
      username: 'rossmuego',
      password: 'password1'
    },
    {
      uid: 2,
      forename: 'Isla',
      surname: 'Dracup',
      username: 'isladracup',
      password: 'password2'
    },
    {
      uid: 3,
      forename: 'Paul',
      surname: 'Wilson',
      username: 'paulwilson',
      password: 'password3'
    },
  ];
  dbo.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = [{
      pid: 1,
      title: 'First Post!',
      content: 'This is the first post on my site',
      uid: 1
    },
    {
      pid: 2,
      title: 'Second Post!',
      content: 'This is the second post on my site after the first post',
      uid: 2
    },
    {
      pid: 3,
      title: 'Third Post!',
      content: 'This is the third post on the site after the first and second',
      uid: 1
    },
  ];
  dbo.collection("posts").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
