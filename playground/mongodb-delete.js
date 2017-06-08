// const MongoClient = require('mongodb').MongoClient;
// isto faz a mesma coisa porque o objeto retornado se tiver a mesma "key" é associado
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('Unable to connect mongo db server');
  }
  console.log('Connected to MongoDB server');

var todos = db.collection('Users');

//delete many
todos.deleteMany({name:"Tiago"}).then((result) => {
  // console.log(result);
  console.log("Done");
},(err) => {})

//delete one
todos.deleteOne({completed:false}).then((result) => {
  // console.log(result);
  console.log("Done");
});

//normalmente para Ids
//findOneAndDelete
todos.findOneAndDelete({_id:new ObjectId("58a7679817b98529e0613368")}).then((doc) => {
  console.log(doc);
});

  // db.close();
});
