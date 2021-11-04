const router = require('express').Router();

const taskModel = require('../models/taskModel');

// Busca das tarefas que estão presente no banco
router.get("/", (req, res) => {
  taskModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Adição de nova tarefa ao banco
router.post("/", async (req, res) => {
  const task = req.body;
  const newTask = new taskModel(task);

  await newTask.save();

  res.json(task);
});

module.exports = router;