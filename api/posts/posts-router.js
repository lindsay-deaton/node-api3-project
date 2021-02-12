const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();
const { validatePostId } = require('../middleware/middleware.js')

router.get('/', (req, res, next) => {
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    next(error)
  })
  // do your magic!
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
  // do your magic!
  // this needs a middleware to verify post id
});

router.delete('/:id', validatePostId, (req, res, next) => {
  Posts.remove(req.params.id)
  .then(count => {
    res.status(200).json({ message: 'the post is destroyed' })
  })
  .catch(next)
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(hub)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updated post' })
  })
  // do your magic!
  // this needs a middleware to verify post id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router


module.exports = router