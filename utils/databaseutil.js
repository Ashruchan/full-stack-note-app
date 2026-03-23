const mongo = require("mongodb");
const mongoclinte = mongo.MongoClient;

let _db;

const mongourl =
  "mongodb+srv://Ashru:142007@mongo.qfpfgpz.mongodb.net/?appName=mongo";
const mongoConnect = (callback) => {
  mongoclinte
    .connect(mongourl)
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
