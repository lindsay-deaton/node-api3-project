const Posts = require('../posts/posts-model.js')
const Users = require('../users/users-model.js')


// function logger(req, res, next) {
//   console.log('falling into the router')
//   next()
//   // do your magic!
// }

async function validateUserId(req, res, next) {
  console.log('checking user id')
  res.set('X-Lambda-Header', 'userRocks')
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json(`user with id ${req.params.id} not found`)
    }
  } catch(error) {
    res.status(500).json('oopsie nope does not work right.')
  }
  
  //dedicated function to check posts id so that each endpoint has this already running under the hood.
  //inside middelwares we have access to req and res objects (query, db,modify req, validate req, etc)
  //here we can query db, modify request, validate request...

  /*make a choice: 
   - allowing the request to proceed to the next middleware
   - send a response to the client */
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (name) {
    next()
  } else {
    res.status(400).json({ error: 'Provide a valid name' })
  }
  // do your magic!
}

async function validatePostId(req, res, next) {
  console.log('checking post logger function')
  res.set('X-Lambda-Header', 'rocks')
  try {
    const post = await Posts.getById(req.params.id)
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json(`post with id ${req.params.id} not found`)
    }
  } catch (error) {
    res.status(500).json('nope lol')
  }
  // do your magic!
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (text) {
    next()
  } else {
    res.status(400).json({ error: 'Provide some valid text' })
  }
  // do your magic!
}

// do not forget to expose these functions to other modules


module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost }
