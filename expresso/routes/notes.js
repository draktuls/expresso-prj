var express = require('express');
const CompileHelper = require('../helpers/CompileHelper');
const AuthMiddle = require('../middleware/AuthMiddleware');
const db = require('better-sqlite3')('expresso.db', { verbose: console.log });
var router = express.Router();

  /* GET notes. */
  router.get('/new', AuthMiddle.authenticateToken, function(req, res, next) {
    var navbar_template = CompileHelper.getNavbar({expressor:true,admin: req.data.admin});
    obj = {
      title: "Notes - Expresso",
      username: req.data.username,
      admin: req.data.admin,
      navbar_val: navbar_template
    };
      return res.render('new', obj);
    });

/* GET notes. */
router.get('/', AuthMiddle.authenticateToken, function(req, res, next) {
  const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
  const alln = db.prepare('SELECT * FROM notes WHERE user_id = ?').all(user.id);
  var navbar_template = CompileHelper.getNavbar({expressor:true,admin: req.data.admin});

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
    title: "Notes - Expresso",
    username: req.data.username,
    admin: req.data.admin,
    notes_list: alln,
    navbar_val: navbar_template
  };
    return res.render('notes', obj);
  });
  router.get('/:id', AuthMiddle.authenticateToken, function(req, res, next) {
    const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
    const alln = db.prepare('SELECT * FROM notes WHERE user_id = ?').all(user.id);
    var navbar_template = CompileHelper.getNavbar({expressor:true,admin: req.data.admin});

    const cur_id = req.params.id;
    const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(cur_id);
    if(note !== null && note !== undefined){
      const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
      if(note.user_id !== user.id && req.data.admin === 0){
        return res.status(403).send({message:"Forbidden!"});
      }
      const obj = {
        title: note.name+" - Expresso",
        admin: req.data.admin,
        date: note.date,
        name: note.name,
        content: note.content,
        current_id: cur_id,
        navbar_val: navbar_template
      };
      return res.render('note', obj);
    }
    return res.status(404).send({message:"Not found!"});
  });
  router.post('/', AuthMiddle.authenticateToken, function(req, res, next) {
    const namen = req.body.name;
    const content = req.body.content;
    if(namen===""){
      return res.status(400).send({message:"The name cannot be empty!",type:"bad"});
    }
    const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
    const final = db.prepare('INSERT INTO notes(user_id,name,content,date) VALUES(?,?,?,(SELECT datetime(CURRENT_TIMESTAMP, \'localtime\')));').run(user.id,namen,content);
    return res.status(200).send({message:"Note has been saved with id "+final.lastInsertRowid,type:"good"});
  });
  router.patch('/:id', AuthMiddle.authenticateToken, function(req, res, next) {
    const cur_id = req.params.id;
    const namen = req.body.name;
    const content = req.body.content;
    const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(cur_id);
    if(note !== null && note !== undefined){
      const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
      if(note.user_id !== user.id && req.data.admin === 0){
        return res.status(403).send({message:"Forbidden!",type:"bad"});
      }
      if(namen === null || content === null){
        return res.status(400).send({message:"Wrong parameters!",type:"bad"});
      }
      if(namen === ""){
        return res.status(400).send({message:"The name cannot be empty!",type:"bad"});
      }
      db.prepare('UPDATE notes SET name = ?, content = ?, date = (SELECT datetime(CURRENT_TIMESTAMP, \'localtime\')) WHERE id = ?').run(namen,content,cur_id);
      return res.status(200).send({message:"The note with id "+note.id+" has been updated!",type:"good"})
    }
    return res.status(404).send({message:"Not found!",type:"bad"});
  });
  router.delete('/:id', AuthMiddle.authenticateToken, function(req, res, next) {
    const cur_id = req.params.id;
    const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(cur_id);
    if(note !== null && note !== undefined){
      const user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.data.username);
      if(note.user_id !== user.id && req.data.admin === 0){
        return res.status(403).send({message:"Forbidden!",type:"bad"});
      }
      db.prepare('DELETE FROM notes WHERE id = ?').run(cur_id);
      return res.status(200).send({message:"The note with id "+note.id+" has been deleted!",type:"good"})
    }
    return res.status(404).send({message:"Not found!",type:"bad"});
  });

module.exports = router;
