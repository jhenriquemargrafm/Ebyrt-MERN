const router = require('express').Router();

const taskModel = require('../models/taskModel');

// Adição de uma tarefa ao banco
router.get("/", (req, res) => {
  taskModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;