// const MongoClient = require('mongodb').MongoClient;
// isto faz a mesma coisa porque o objeto retornado se tiver a mesma "key" é associado
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('Unable to connect mongo db server');
  }
  console.log('Connected to MongoDB server');

var users = db.collection('Users');
  // db.collection('Todos').find({
  //   __id: "58a76635f7b5f61e4002d121"
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('unable to fetch');
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count ${count}`);
  //
  // },(err) => {
  //   console.log('unable to fetch');
  // });

  users.find({
    name: "Tiago Araujo"
  }).toArray().then((users) => {
    console.log('Users Tiago Araujo');
    console.log(JSON.stringify(users,undefined,2));
  },(err) => {
    console.log('unable to fetch');
  });

  db.close();
});
