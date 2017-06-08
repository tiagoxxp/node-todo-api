require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;
//set middleware
app.use(bodyParser.json());
// app.use(authenticate);

app.post('/todos',authenticate, (req,res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
//save Todo
  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, async (req,res) => {
  try {
    const todos = await Todo.find({
    _creator: req.user._id
  });
  res.send({todos});
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get /todos/123
app.get('/todos/:id', authenticate, (req,res) => {
   var objId = req.params.id;

   if(!ObjectId.isValid(objId)){
    return res.status(404).send();
   }

  Todo.findOne({
    _id: objId,
    _creator: req.user._id
  }).then((todos) => {
   if(!todos){
     return res.status(404).send();
   }
   res.status(200).send({todos});
 }).catch((e) => {
   res.status(400).send();
 });

});


app.delete('/todos/:id', authenticate, async (req,res) => {
    // get the id
    var objId = req.params.id;
    // validate the id
    if(!ObjectId.isValid(objId)){
     return res.status(404).send();
    }
    try {
      const todo = await Todo.findOneAndRemove({
      _id: objId,
      _creator: req.user._id
    });

    if(!todo){
      res.status(404).send();
    }

    res.send({todo});
    } catch (error) {
       res.status(400).send();
    }
});


app.patch('/todos/:id', authenticate, (req,res) => {
  
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectId.isValid(id)){
   return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    },
    {
      $set:body
    },
    {
      new: true
    }
  ).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    return res.status(404).send();
  });

});


app.post('/users', async (req,res) => {

  try {
    const body = _.pick(req.body,['email','password']);
    var user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth',token).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

});

//para definir middleware basta colocar a funcao aqui
app.get('/users/me', authenticate,(req,res) => {
  // var token = req.header('x-auth');
  //
  // User.findByToken(token).then((user) => {
  //   if(!user){
  //     //desta forma a funçao pára e vai para o catch
  //     return Promise.reject();
  //   }
  //
  //   res.send(user);
  // }).catch((err) => {
  //   res.status(401).send();
  // });
  res.send(req.user);

});
// .catch((err) => {
//
// });


app.post('/users/login',async (req,res) => {
  try 
  {
    const body = _.pick(req.body,['email','password']);
    const user = await User.findByCredentials(body.email,body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

//logout
app.delete('/users/me/token', authenticate, async (req,res) => {

  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }

});

app.listen(port, () => {
  console.log('Started on 3000');
});

module.exports = {app};




// var newUser = new User({
//   email: "tiago.araujo@beemybees.com"
// });
//
// newUser.save().then((user) => {
//    console.log('User saved ',user);
// },(e) => {
//    console.log('unable to save user ',e);
// });

// var newTodo = new Todo({
//   text: "Search for places tonight"
// });
//
// newTodo.save().then((doc) => {
//   // console.log('Saved doc',doc._id);
//   // console.log('Saved doc',doc._id.getTimestamp());
//   console.log('Saved doc',doc);
// },(e) => {
//   console.log('unable to save todo ',e);
// });
