// const MongoClient = require('mongodb').MongoClient;
// isto faz a mesma coisa porque o objeto retornado se tiver a mesma "key" é associado
const {MongoClient, ObjectId} = require('mongodb');
//assim pode se user objetos unicos atraves das chaves do mongodb
// var obj = new ObjectId();
//  console.log(obj);
// var user = {'name':'Tiago', age:25};
// var {name} = user;
//
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db) => {
  if(error){
    return console.log('Unable to connect mongo db server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err,result) =>{
  //   if(error){
  //     return console.log('Unable insert todo',err);
  //   }
  //   //result.ops tem todos os documentos que foram inseridos
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Tiago Araujo',
  //   age: 25,
  //   location:'Braga'
  // },(err,result) =>{
  //   if(error){
  //     return console.log('Unable insert todo',err);
  //   }
  //   //result.ops tem todos os documentos que foram inseridos
  //   //get the time of document creation
  //   // result.ops[0]._id.getTimestamp()
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
  // });

  db.close();
});
