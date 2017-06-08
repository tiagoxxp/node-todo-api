const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "58aeef6d7fa4f224600a1598";

if(!ObjectId.isValid(id)){
    return console.log(`id not valid`);
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log(`Todos ${todos}`);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log(`Todo ${todo}`);
});

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log(`id not find`);
  }
    console.log(`Todo by id ${todo}`);
}).catch((e) => console.log(e));

var userId = "58ada61363b20c25f89c5a71";

User.findById(userId).then((user) => {
  if(!user){
    return console.log(`id not find`);
  }
    console.log(`Todo by id ${user}`);
}).catch((e) => console.log(e));
