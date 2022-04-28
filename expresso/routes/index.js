var express = require('express');
const RndHelper = require('../helpers/RndHelper');
const CompileHelper = require('../helpers/CompileHelper');
const AuthMiddle = require('../middleware/AuthMiddleware');
var router = express.Router();

router.get('/register', function(req, res, next) {
  return res.render('register', {title: "Register - Expresso"});
});

router.get('/login', function(req, res, next) {
  return res.render('login', {title: "Login - Expresso"});
});
/* GET home page. */
router.get('/', AuthMiddle.authenticateToken, function(req, res, next) {
  var navbar_template = CompileHelper.getNavbar({index:true,admin: req.data.admin});
  obj = {
    title: "Home - Expresso",
    username: req.data.username,
    admin: req.data.admin,
    rnd: RndHelper.getBullshit(),
    navbar_val:navbar_template
};
  return res.render('index', obj);
});
/* GET settings page. */
router.get('/settings', AuthMiddle.authenticateToken, function(req, res, next) {
  var navbar_template = CompileHelper.getNavbar({settings:true,admin: req.data.admin});
  obj = {
    title: "Settings - Expresso",
    username: req.data.username,
    admin: req.data.admin,
    navbar_val:navbar_template
  };
  return res.render('settings', obj);
});

module.exports = router;
