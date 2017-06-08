// const MongoClient = require('mongodb').MongoClient;
// isto faz a mesma coisa porque o objeto retornado se tiver a mesma "key" é associado
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('Unable to connect mongo db server');
  }
  console.log('Connected to MongoDB server');

// var todos = db.collection('Todos');
// //mais metodos na documentacao
// todos.findOneAndUpdate({
//   _id: new ObjectId("58a765e1835fe62b00ebbbcf")
// },{
//   $set:{
//     completed: true
//   }
// },{
// returnOriginal: false
// }).then((value) => {
//   console.log(value);
// });


var users = db.collection('Users');
//mais metodos na documentacao
users.findOneAndUpdate(
  {
  _id: new ObjectId("58a76911998b733424dfac39")
  },
  {
  $set:{
    name: "Tiago Manuel Longras Araujo"
  },
  $inc:{
    age: 1
  }
  },
{
returnOriginal: false
}).then((value) => {
  console.log(value);
});

  // db.close();
});
