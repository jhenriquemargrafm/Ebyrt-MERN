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

// Editar uma tarefa no banco
router.put('/', async (req, res) => {
  const {id, currentTitle, currentDescription, currentStatus }= req.body;
  try {
    await taskModel.updateOne(
      { _id: id }, 
      { $set: { title: currentTitle, 
        description: currentDescription, 
        status: currentStatus }
      })
    res.status(200).json({message: "A tarefa foi atualizada!"});
  } catch (error) {
    res.status(500).json({error:'Houve um erro no servidor'})
  }
});

// Deletar uma tarefa no banco
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await taskModel.findByIdAndRemove(id).exec()
  res.send("Tarefa foi deletada")
})

module.exports = router;