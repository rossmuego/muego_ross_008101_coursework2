var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = [{
      uid: 1,
      forename: 'Ross',
      surname: 'Muego',
      username: 'rossmuego',
      password: '7c6a180b36896a0a8c02787eeafb0e4c',
      profile_pic: 'ross.jpg',
      location: "Edinburgh",
      fav_lang: "JavaScript"
    },
    {
      uid: 2,
      forename: 'Isla',
      surname: 'Dracup',
      username: 'isladracup',
      password: '6cb75f652a9b52798eb6cf2201057c73',
      profile_pic: 'isla.jpg',
      location: "London",
      fav_lang: "Visual Basic"
    },
    {
      uid: 3,
      forename: 'Scott',
      surname: 'Bean',
      username: 'scottbean',
      password: '819b0643d6b89dc9b579fdfc9094f28e',
      profile_pic: 'scott.jpg',
      location: "Edinburgh",
      fav_lang: "Python"
    },
  ];
  dbo.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
var d = new Date();

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = [{
      pid: Date.now() + Math.floor(Math.random() * 100),
      title: 'First Post!',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut turpis non quam fermentum viverra. Integer mattis rhoncus odio nec sagittis. Nam vitae diam vitae magna suscipit ultricies. Integer et felis rutrum, sagittis lorem sit amet, sollicitudin massa. Fusce et metus pretium, aliquam purus eget, lacinia enim. Fusce suscipit pretium mauris ac euismod. Nunc tincidunt lectus leo, vel laoreet ex finibus congue. Nulla imperdiet sem nunc, eu suscipit urna aliquet ac. Curabitur vitae augue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas aliquet molestie. Aenean ut magna diam.",
      uid: 1,
      date_posted: d.toDateString(),
      post_image: 'Sun1.png'
    },
    {
      pid: Date.now() + Math.floor(Math.random() * 100),
      title: 'Second Post!',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut turpis non quam fermentum viverra. Integer mattis rhoncus odio nec sagittis. Nam vitae diam vitae magna suscipit ultricies. Integer et felis rutrum, sagittis lorem sit amet, sollicitudin massa. Fusce et metus pretium, aliquam purus eget, lacinia enim. Fusce suscipit pretium mauris ac euismod. Nunc tincidunt lectus leo, vel laoreet ex finibus congue. Nulla imperdiet sem nunc, eu suscipit urna aliquet ac. Curabitur vitae augue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas aliquet molestie. Aenean ut magna diam.",
      uid: 2,
      date_posted: d.toDateString(),
      post_image: 'clouds.jpg'
    },
    {
      pid: Date.now() + Math.floor(Math.random() * 100),
      title: 'Third Post!',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut turpis non quam fermentum viverra. Integer mattis rhoncus odio nec sagittis. Nam vitae diam vitae magna suscipit ultricies. Integer et felis rutrum, sagittis lorem sit amet, sollicitudin massa. Fusce et metus pretium, aliquam purus eget, lacinia enim. Fusce suscipit pretium mauris ac euismod. Nunc tincidunt lectus leo, vel laoreet ex finibus congue. Nulla imperdiet sem nunc, eu suscipit urna aliquet ac. Curabitur vitae augue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscugue ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas  ut dui faucibus suscipit vitae quis nisi. Maecenas egestas aliquet molestie. Aenean ut magna diam.",
      uid: 1,
      date_posted: d.toDateString(),
      post_image: 'post1.jpg'
    },
  ];
  dbo.collection("posts").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("40280659");
  var myobj = [{
      followed_id: 1,
      follower_id: 2,
    },
    {
      followed_id: 1,
      follower_id: 3,
    },
    {
      followed_id: 2,
      follower_id: 1,
    },
  ];
  dbo.collection("relationships").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
