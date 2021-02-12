const express = require('express');
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')
const router = express.Router();
const { validateUserId, validateUser }

router.post('/', validateUser, (req, res, next) => {
  Users.add(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    next(error)
  })
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get('/', (req, res, next) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    next(error)
  })
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
  // do your magic!
  // this needs a middleware to verify user id
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
  .then(count => {
    res.status(200).json({ message: 'This users is a gonner' })
  })
  .catch(next)
  // do your magic!
  // this needs a middleware to verify user id
});

router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error updating user' })
  })
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post('/:id/posts', validateUserId, (req, res) => {
  const postInfo = { ...req.body, post_id: req.params.id }
  Posts.add(postInfo)
  .then(post => {
    res.status(210).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error adding post to user' })
  })
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Error getting user posts' })
  })
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router

module.exports = router