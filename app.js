// console.log("hello world")

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://dariotao01:U2lz6UlVYc4FVVSh@cluster0.ztilryq.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("UofTCourses");
    dbo.collection("courses").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });