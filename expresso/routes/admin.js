var express = require('express');
const CompileHelper = require('../helpers/CompileHelper');
const db = require('better-sqlite3')('expresso.db', { verbose: console.log });
const AuthMiddle = require('../middleware/AuthMiddleware');
var router = express.Router();

router.get('/users', AuthMiddle.isAdminCheck ,function(req, res, next) {
  var navbar_template = CompileHelper.getNavbar({admin_spy:true,admin: req.data.admin});
  const users = db.prepare('SELECT * FROM users').all();  
  obj = {
    title: "Expresspy - Expresso",
    username: req.data.username,
    admin: req.data.admin,
    users_list: users,
    navbar_val: navbar_template
  };
  return res.render("users",obj);
});
router.delete('/users/:id', AuthMiddle.isAdminCheck ,function(req, res, next) {
  if(req.data.admin!==1){
    return res.status(403).send({message:"Forbidden!",type:"bad"});
  }
  const cur_id = req.params.id;
  const note = db.prepare('SELECT * FROM users WHERE id = ?').get(cur_id);
  if(note !== null && note !== undefined){
    if(note.admin === 1){
      return res.status(400).send({message:"Administrator users cannot be deleted!",type:"bad"});
    }
    db.prepare('DELETE FROM users WHERE id = ?').run(cur_id);
    db.prepare('DELETE FROM notes WHERE user_id = ?').run(cur_id);
    return res.status(200).send({message:"The user with id "+note.id+" has been deleted along with it's notes!!!",type:"good"})
  }
  return res.status(404).send({message:"User doesn't exist!",type:"bad"});
});
router.get('/users/:id', AuthMiddle.isAdminCheck , function(req, res, next) {
  if(req.data.admin!==1){
    return res.status(403).send({message:"Forbidden!",type:"bad"});
  }
  const cur_id = req.params.id;
  const alln = db.prepare('SELECT * FROM notes WHERE user_id = ?').all(cur_id);
  var navbar_template = CompileHelper.getNavbar({admin_spy:true,admin: req.data.admin});

  const namecutter = 50;
  const cutter = 70;

  for(var i = 0;i < alln.length; i++){
    if(alln[i].content.length > cutter){
      alln[i].content = alln[i].content.substr(0,cutter-1);
      alln[i].content += "...";
    }
    if(alln[i].name.length > namecutter){
      alln[i].name = alln[i].name.substr(0,namecutter-1);
      alln[i].name += "...";
    }
  }
  //console.log(alln);
  obj = {
    title: "Spy - Expresso",
    username: req.data.username,
    admin: req.data.admin,
    notes_list: alln,
    navbar_val: navbar_template
  };
    return res.render('notes', obj);
});

module.exports = router;
