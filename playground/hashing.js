const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = "123abc!";

// bcrypt.genSalt(10,(err,salt) => {
//   bcrypt.hash(password,salt,(err,hash) => {
//     console.log(hash);
//   });
// });

var hashPassword = "$2a$10$MciwZmgx3nNA3hL1lLHc7epB0j2ctCwONdFBoONhNm1nZ/U/bi7w2";

bcrypt.compare(password,hashPassword,(err,result) => {
  console.log(result);
});
// var data = {
//   id: 4
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(`token: ${token}`);
// var decoded = jwt.verify(token,'123abc');
// console.log('decoded',decoded);

// var message = "I am user number 3";
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+"secret").toString()
// };

//if someone changed the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+"secret").toString();
//
// if(resultHash === token.hash){
//   console.log('data was not changed');
// }else{
//   console.log('data was changed');
// }
