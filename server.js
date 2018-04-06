var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var url = require('url');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var formidable = require('formidable');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');
var md5 = require('md5');
var fileUpload = require('express-fileupload');

var menubar = "<a href=" + '/login' + ">Login</a> <a href=" + '/registration' + "> Sign Up </a>"
var sess;

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.use(fileUpload());

app.use(session({
  secret: 'supersecret'
}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    dbo.collection("posts").find({}).toArray(function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (result[i].content.length > 1600) {
          result[i].content = result[i].content.slice(0, 1600) + "... <a href=" + '/post/' + result[i].pid + ">See More</a>"
        } else {
          while (result[i].content.length < 1600) {
            result[i].content += " "
          }
        }
      }
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
          liu: req.session.loggedUsr,
          regOptions: menubar
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
  sess = req.session;
  if (!sess.loggedId && !sess.loggedUsr) {
    res.redirect('/login')
  } else {
    res.render('createpost', {
      regOptions: menubar
    })
  }
});

app.get('/logout', function(req, res) {
  menubar = "<a href=" + '/login' + ">Login</a> <a href=" + '/registration' + "> Sign Up </a>"
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
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
        for (var i = 0; i < result.length; i++) {
          if (result[i].content.length > 1600) {
            result[i].content = result[i].content.slice(0, 1600) + "... <a href=" + '/post/' + result[i].pid + ">See More</a>"
          } else {
            while (result[i].content.length < 1600) {
              result[i].content += " "
            }
          }
        }
        var button_txt = "Follow"
        var buttonClass = "follow-button"
        var buttonRequest = "follow"

        var obj = {
          follower_id: req.session.loggedId,
          followed_id: uresult[0].uid
        }
        dbo.collection("relationships").find(obj).toArray(function(err, sresult) {
          if (sresult.length > 0) {
            button_txt = "Unfollow"
            buttonClass = "unfollow-button"
            buttonRequest = "unfollow"
          }

          dbo.collection("relationships").find({}).toArray(function(err, rresult) {
            dbo.collection("users").find({}).toArray(function(err, fresult) {
              var followers = []
              var following = []
              for (var i = 0; i < rresult.length; i++) {
                if (rresult[i].followed_id == uresult[0].uid) {
                  followers.push(rresult[i])
                } else if (rresult[i].follower_id == uresult[0].uid) {
                  following.push(rresult[i])
                }
              }
              if (req.session.loggedUsr == uresult[0].username) {
                button_txt = "Edit Profile"
                buttonClass = "edit-profile"
                buttonRequest = "editprofile"
              }
              res.render('user', {
                username: uresult[0].username,
                liu: req.session.loggedUsr,
                uid: uresult[0].uid,
                forename: uresult[0].forename,
                surname: uresult[0].surname,
                posts: result,
                regOptions: menubar,
                profile_pic: uresult[0].profile_pic,
                favlang: uresult[0].fav_lang,
                location: uresult[0].location,
                buttonText: button_txt,
                buttonClass: buttonClass,
                buttonRequest: buttonRequest,
                followers: followers.length,
                following: following.length
              });
              db.close();
            });
          });
        });
      });
    });
  })
});

app.get('/post/:pid', function(req, res) {
  sess = req.session
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      pid: parseInt(req.params.pid)
    };
    dbo.collection("posts").find(query).toArray(function(err, result) {
      if (err) throw err;
      var user = {
        uid: result[0].uid
      }
      dbo.collection("users").find(user).toArray(function(err, uresult) {
        if (err) throw err;
        var post = {
          postid: result[0].pid
        }
        dbo.collection("comments").find(post).toArray(function(err, cresult) {
          if (err) throw err;
          dbo.collection("users").find({}).toArray(function(err, curesult) {
            if (err) throw err;
            for (var i = cresult.length - 1; i >= 0; i--) {
              for (var j = 0; j < curesult.length; j++) {
                if (cresult[i].commenterid == curesult[j].uid) {
                  cresult[i].username = curesult[j].username
                  cresult[i].forename = curesult[j].forename
                  cresult[i].surname = curesult[j].surname
                  cresult[i].profile_pic = curesult[j].profile_pic
                }
              }
            }
            res.render('post', {
              liu: sess.loggedUsr,
              pid: result[0].pid,
              postimage: result[0].post_image,
              title: result[0].title,
              content: result[0].content,
              uid: result[0].uid,
              regOptions: menubar,
              forename: uresult[0].forename,
              surname: uresult[0].surname,
              username: uresult[0].username,
              dateposted: result[0].date_posted,
              comments: cresult.reverse()
            });
            db.close();
          });
        });
      });
    });
  })
});

app.get('/login', function(req, res) {
  sess = req.session
  if (!sess.loggedId && !sess.loggedUsr) {
    res.render('login', {
      liu: sess.loggedId,
      regOptions: menubar
    });
  } else {
    res.redirect('/user/' + sess.loggedUsr)
  }
});

app.get('/registration', function(req, res) {
  sess = req.session
  if (!sess.loggedId && !sess.loggedUsr) {
    res.render('registration', {
      liu: req.session.loggedUsr,
      regOptions: menubar
    });
  } else {
    res.redirect('/user/' + sess.loggedUsr)
  }
});

app.post('/login', function(req, res) {
  sess = req.session
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("40280659");
    var query = {
      username: req.body.username,
      password: md5(req.body.password)
    };
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      if (result.length == 0) {
        res.redirect('/')
      } else {
        sess.loggedId = result[0].uid
        sess.loggedUsr = result[0].username;
        menubar = "<a href=" + '/post/new' + ">New Post</a><a href=" + '/user/' + req.session.loggedUsr + ">Profile</a> <a href=" + '/logout' + ">Logout</a>";
        result[0].regOptions = menubar
        res.redirect('/user/' + result[0].username)
      }
      db.close();
    });
  });
});

app.post('/registration', function(req, res) {
  sess = req.session
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
            password: md5(req.body.password),
            profile_pic: 'default.png',
            location: req.body.location,
            fav_lang: req.body.favlang
          }
          dbo.collection("users").insertOne(myobj, function(err, result) {
            if (err) throw err;
            sess.loggedUsr = myobj.username;
            sess.loggedId = myobj.uid
            menubar = "<a href=" + '/post/new' + ">New Post</a><a href=" + '/user/' + req.session.loggedUsr + ">Profile</a> <a href=" + '/logout' + ">Logout</a>";
            res.redirect('/user/' + myobj.username)
            db.close();
          });
        });
      }
    });
  });
});

app.post('/post/new', function(req, res) {
  sess = req.session
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("40280659");
    var d = new Date();
    var myobj = {
      pid: Date.now() + Math.floor(Math.random() * 100),
      title: req.body.title,
      content: req.body.content,
      uid: sess.loggedId,
      date_posted: d.toDateString()
    }
    dbo.collection("posts").insertOne(myobj, function(err, result) {
      if (err) throw err;
      res.redirect('/post/' + myobj.pid)
      db.close();
    });
  });
});

app.post('/follow', function(req, res) {
  sess = req.session
  if (!sess.loggedId && !sess.loggedUsr) {
    res.redirect('/login')
  } else {
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("40280659");
      if (err) throw err;
      var myobj = {
        followed_id: parseInt(req.body.uid),
        follower_id: req.session.loggedId,
      }
      dbo.collection("relationships").insertOne(myobj, function(err, result) {
        var user = {
          uid: parseInt(req.body.uid)
        }
        dbo.collection("users").find(user).toArray(function(err, rresult) {
          if (err) throw err;
          res.redirect('/user/' + rresult[0].username)
          db.close();
        });
      });
    });
  }
});

app.post('/unfollow', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("40280659");
    if (err) throw err;
    var myobj = {
      followed_id: parseInt(req.body.uid),
      follower_id: req.session.loggedId,
    }
    dbo.collection("relationships").deleteOne(myobj, function(err, obj) {
      var user = {
        uid: parseInt(req.body.uid)
      }
      dbo.collection("users").find(user).toArray(function(err, rresult) {
        if (err) throw err;
        res.redirect('/user/' + rresult[0].username)
        db.close();
      });
    });
  });
});

app.post('/editprofile', function(req, res) {
  res.redirect('/user/' + req.session.loggedUsr + '/editprofile')
});

app.get('/user/:uid/editprofile', function(req, res) {
  sess = req.session
  if (!sess.loggedId && !sess.loggedUsr) {
    res.redirect('/login')
  } else {
    res.render('editprofile')
  }
});

app.post('/updateprofile', function(req, res) {

  var fileName = Date.now() + Math.floor(Math.random() * 100)
  if (!req.files.file) {
    fileName = ""
  } else {
    let sampleFile = req.files.file;
    sampleFile.mv('./assets/profile/' + fileName + '.png', function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }

  var updateValues = req.body;
  Object.keys(updateValues).forEach(function(key) {
    if (updateValues[key].length <= 0) {
      delete updateValues[key];
    }
  });
  if (fileName != "") {
    updateValues.profile_pic = fileName + ".png"
  }
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("40280659");
    if (err) throw err;
    var myquery = {
      uid: req.session.loggedId
    };
    var inputValues = {
      $set: updateValues
    }
    dbo.collection("users").updateOne(myquery, inputValues, function(err, res) {
      if (err) throw err;
      db.close();
    });
    res.redirect('/user/' + req.session.loggedUsr)
  });
});

app.post('/comment', function(req, res) {
  sess = req.session
  if (!sess.loggedId && !sess.loggedUsr) {
    res.redirect('/login')
  } else {
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("40280659");
      if (err) throw err;
      var myobj = {
        postid: parseInt(req.body.button),
        commentContent: req.body.comment,
        commenterid: req.session.loggedId
      }
      dbo.collection("comments").insertOne(myobj, function(err, obj) {
        if (err) throw err;
        res.redirect('/post/' + parseInt(req.body.button))
        db.close();
      });
    });
  }
});

app.get('/user/:uid/following', function(req, res) {
  var user = req.params.uid

});

app.get('/user/:uid/followers', function(req, res) {

});

app.listen(3000);
