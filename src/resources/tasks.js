import express from 'express';
const res = require("express/lib/response");
const router = express.Router();

// use "require" to import JSON files
const tasks = require('../data/tasks.json');

router.get('/getAllTasks', (req, res) => {
    res.status(200).json({
        data: tasks,
    });
});
  
router.get('/getTaskById/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find((task) =>{
        return task.id === taskId
    });
    if(task)
    {
        res.status(200).json({
            data : task
        });
    }
    else
    {
        res.status(404).send('The specified task does not exist');
    }
});

router.get('/getTasksByStatus', (req, res) => {
    const taskStatus = req.query.status;
    const compliantTasks = tasks.filter((task) =>{
        return task.status === taskStatus
    });
    if(compliantTasks.length > 0)
    {
        res.status(200).json({
            data : compliantTasks
        });
    }
    else
    {
        res.status(404).send('The specified task does not exist');
    }
})

router.post('/', (req, res) => {
    res.send(req.body)
})

router.delete('/:id', (req, res) => {
    res.status(200).json({
        data: tasks.filter(task => task.id == req.params.id)
    })
});

module.exports = router