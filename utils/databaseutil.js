const mongo = require("mongodb");
const mongoclinte = mongo.MongoClient;
require("dotenv").config();

let _db;
const mongoUrl = process.env.MONGO_URL;
const mongoConnect = (callback) => {
  mongoclinte
    .connect(mongoUrl)
    .then((client) => {
      console.log("the database is connected correctly");
      callback(client);
      _db=client.db('notes');
    })
    .catch((err) => {
      console.log("error while connecting to mongodb database", err);
    });
};
const getdb =()=>{
    if(!_db){
        throw new Error('mongo not conneted')
    }
    return _db;
}
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
