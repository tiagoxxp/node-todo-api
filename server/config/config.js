var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  //automaticamente ao fazer require de um json esse json é transformado em objeto
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
  });

}
//the same
// if(env = 'development'){
// process.env.PORT = 3000;
// process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if(env = 'test'){
// process.env.PORT = 3000;
// process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
