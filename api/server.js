const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const postsRouter = require('./posts/posts-router.js')
const usersRouter = require('./users/users-router.js')

const server = express();

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use((req, res, next) => {
  console.log('Welcome to my app!')
  next()
})

const logging = [logger]

server.use('/api/posts', logging, postsRouter)
server.use('/api/users', logging, usersRouter)

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? `${req.name}` : ""

  res.send(`
  <h2>Let's write some middleware!</h2>
  <p>Welcome${nameInsert} to the Lambda API</p>
  `);
});

module.exports = server;

function logger(req, res, next) {
  console.log('falling into the router')
  next()
  // do your magic!
}