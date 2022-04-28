var express = require('express');
const db = require('better-sqlite3')('expresso.db', { verbose: console.log });
const bcrypt = require('bcrypt');
const JWTHelper = require('../helpers/JWTHelper');
const AuthMiddle = require('../middleware/AuthMiddleware');
var router = express.Router();

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

router.post('/login', function(req, res, next) {
  const user = req.body.username;
  const pass = req.body.password;
  if(user === undefined || pass === undefined || user === '' || pass === ''){
    return res.redirect("/login??message=Invalid parameters!&type=bad"); 
  }
  if(containsSpecialChars(user)){
    return res.redirect("/login??message=Invalid characters!&type=bad"); 
  }
  const row = db.prepare('SELECT * FROM users WHERE name = ?').get(user);
  if(row==null){
    return res.redirect("/login?message=The user doesn't exist!&type=bad"); 
  }
  const hash = bcrypt.hashSync(row.password, 10);
  const result = bcrypt.compareSync(pass, row.password);
  //console.log(JWTHelper.sign({username : user}))
  if(result){
    const token = JWTHelper.sign({username : user,isAdmin : row.admin})
    res.cookie('session', token, { httpOnly: true, maxAge: 1200000 });
    return res.redirect("/"); 
  }else{
    return res.redirect("/login?message=The user doesn't exist!&type=bad"); 
  }
});
router.get('/logout', function(req, res, next) {
  res.clearCookie('session');
  return res.redirect("/login");
});
router.post('/register', function(req, res, next) {
  const user = req.body.username;
  const pass = req.body.password;
  const pass_rep = req.body.password_repeat;
  if(user === undefined || pass === undefined || pass_rep === undefined || pass_rep === null || user === '' || pass === ''){
    return res.redirect("/register?message=Invalid parameters&type=bad");
  }
  if(containsSpecialChars(user)){
    return res.redirect("/register?message=Invalid characters&type=bad"); 
  }
  if(pass!==pass_rep){
    return res.redirect("/register?message=Passwords do not match!&type=bad"); 
  }
  if(user.length > 30){
    return res.redirect("/register?message=Username is too long&type=bad");
  }
  if(user.length <= 2){
    return res.redirect("/register?message=Username is too short&type=bad");
  }
  const row = db.prepare('SELECT * FROM users WHERE name = ?').get(user);
  console.log(row);
  if(row!==undefined){
    return res.redirect("/register?message=User already exists!&type=bad");
  }
  const hash = bcrypt.hashSync(pass, 10);
  db.prepare('INSERT INTO users(name,password,admin) VALUES(?,?,0)').run(user,hash);
  return res.redirect("/register?message=User has been successfully added!&type=good");
});

router.post('/update', AuthMiddle.authenticateToken, function(req, res, next) {
  const user = req.data.username;
  const pass = req.body.password;
  const pass_repeat = req.body.password_repeat;
  if(pass_repeat === undefined || pass === undefined || pass_repeat === '' || pass === ''){
    return res.redirect("/settings?message=Invalid parameters&type=bad");
  }
  if(pass_repeat !== pass){
    return res.redirect("/settings?message=Passwords do not match&type=bad");
  }
  const hash = bcrypt.hashSync(pass, 10);
  db.prepare('UPDATE users SET password = ?').run(hash);
  return res.redirect("/settings?message=Password has been successfully updated!&type=good");
});

module.exports = router;
