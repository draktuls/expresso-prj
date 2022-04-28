var fs = require('fs');
var hbs = require('handlebars');

module.exports = {
    getNavbar(obj){
        const navbar = fs.readFileSync("views/nav.hbs", 'utf-8');
        const navbar_compiler = hbs.compile(navbar);
        const navbar_template = navbar_compiler(obj);
        return navbar_template;
    }
}