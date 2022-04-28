const jwt = require('jsonwebtoken');

module.exports = {
    sign(data) {
        data = Object.assign(data);
        return (jwt.sign(data, process.env.TOKEN_SECRET, { algorithm:'HS256' }))
    },
    decode(token) {
        return (jwt.verify(token, process.env.TOKEN_SECRET, { algorithm:'HS256'}));
    }
}