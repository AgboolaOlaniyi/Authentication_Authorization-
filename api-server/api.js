
const express = require('express');
const itemsrouter = require('./items/api.router');
const userRouter = require('./users/users.router')





const app = express()
const port = 3000




app.use('/items', itemsrouter)
app.use('/users', userRouter)



app.listen(port, () =>{

console.log(`listening on port: ${port}`)
})