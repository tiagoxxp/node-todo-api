const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
//user model
var UserSchema = new mongoose.Schema({
  email:{
    require: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message : '{VALUE} is not a valid email'
    }
  },
  password : {
    type: String,
    require: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

//override toJSON para enviar apenas od dados que queremos
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

// metodos instanciados tem a variabel user local
//arrow functions not bind the "this" keyword
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},process.env.JWT_SECRET).toString();

  user.tokens.push({access,token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token){
  //remove elementos de um array desde que sejam iguais nos criterios que passamos
  var user = this;

  return user.update({
    $pull:{
      tokens: {
        token: token
      }
    }
  });
};

// metodos modelo tem a variabel user global
// is a object com tudo o que esta la dentro torna se model methods
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token,process.env.JWT_SECRET)
  } catch (e) {
    // return new Promise((resolve,reject) => {
    //   reject();
    // });
    //the same
    return Promise.reject();
  }

 // quotes é necessario quando se tem ponto nos valores
 //isto retorna uma promise
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email,password) {
  var User = this;
  var decoded;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err,result) => {
        if(result){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  });
};

//mongoose middleware
UserSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
