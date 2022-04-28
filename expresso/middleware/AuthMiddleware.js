const JWTHelper = require('../helpers/JWTHelper');
const db = require('better-sqlite3')('expresso.db', { verbose: console.log });

module.exports = {
    authenticateToken(req,res,next){
        try{
            if (req.cookies.session === undefined) return res.redirect('/login');
            let data = JWTHelper.decode(req.cookies.session);
            req.data = {
                username: data.username,
                admin: data.isAdmin
            }
            const user = db.prepare('SELECT * FROM users WHERE name = ?').get(data.username);
            if(user=== null || user === undefined || user==={}){
                res.clearCookie('session');
                return res.redirect('/login');
            }
            next();
        } catch(e) {
            console.log(e);
            return res.status(500).send('Internal server error');
        }
    },
    isAdminCheck(req,res,next){
        try{
            if (req.cookies.session === undefined) return res.redirect('/');
            let data = JWTHelper.decode(req.cookies.session);
            if(data.isAdmin === 1){
                req.data = {
                    username: data.username,
                    admin: data.isAdmin
                }
                next();
            }else{
                return res.status(403).send('Forbidden!')
            }
        } catch(e) {
            console.log(e);
            return res.status(500).send('Internal server error');
        }
    }
}