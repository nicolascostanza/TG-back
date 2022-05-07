const express = require('express');

const projects = require('../data/projects.json');

const router = express.Router();

// router.get('/getAll', (req, res) => {

// });

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

module.exports = router;
