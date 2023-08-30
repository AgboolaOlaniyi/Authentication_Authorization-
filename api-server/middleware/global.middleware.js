const db = require('../db/users.json')
const fs = require('fs')

const checkBody = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            data: null,
            error: 'must have a body'
        })
    }

    next()
}


const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const base64 = new Buffer.from(authHeader.split(' ')[1], 'base64')
    const base64ToString = base64.toString()
    const usernameAndPassword =  base64ToString.split(':');
    const auth = usernameAndPassword;

    const username = auth[0];
    const password = auth[1];
 
    const existingUser = db.users.find(user => user.username === username && user.password === password)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

}

const checkApi_key = (req, res, next) => {
    const usersData = fs.readFileSync("./db/users.json");
    const userDB = JSON.parse(usersData);
  
    const apiKey = req.headers.api_key;
  
    if (!apiKey) {
      return res.status(401).json({
        message: "you are not authenticated, api_key required",
      });
    }
  
    const foundUser = userDB.find((user) => user.api_key === apiKey);
    if (!foundUser) {
     return res.status(401).json({
        message: "you are not authenticated",
      });
    }
    next();
  };

const checkAdmin = (req, res, next) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized!' });
    }

    next()
}

module.exports = {
    checkBody,
    basicAuth,
    checkApi_key,
    checkAdmin
}
