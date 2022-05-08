import express from 'express';
const res = require("express/lib/response");
const fileSystem = require('fs');
const router = express.Router();
const jAdress = 'src/data/tasks.json';

// use "require" to import JSON files
const tasks = require('../data/tasks.json');

router.get('/taskList', (req, res) => {
    res.status(200).json({data: tasks});
});
  
router.get('/findById/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find((task) =>{return task.id === taskId});

    if(task)
    {
        res.status(200).json({data : task});
    }
    else
    {
        res.status(404).send('The specified task does not exist');
    }
});

router.get('/filterByStatus', (req, res) => {
    const taskStatus = req.query.status;
    const compliantTasks = tasks.filter((task) => {return task.status === taskStatus});

    if(compliantTasks.length > 0)
    {
        res.status(200).json({data : compliantTasks});
    }
    else
    {
        res.status(404).send('The specified task does not exist');
    }
});

router.post('/add', (req, res) => {
    const taskData = json(req.body);
    const taskId = req.params.id;
    const comparator = tasks.find((task) => {return task.id === taskId});

    if(comparator)
    {
        res.status(409).send('Requested id already exist on database');
    }
    else
    {
        if(taskData.parentProject && taskData.id && taskData.taskCreator && taskData.taskName
            && taskData.startDate)
        {
            tasks.push(taskData);
            fileSystem.writeFile(jAdress, JSON.stringify(tasks), (err) => {
                if(err)
                {
                    res.status(500).send(err);
                }
                else
                {
                    res.status(201).send('Task has been successfully created');
                }
            })
        }
        else
        {
            res.status(400).send('One or more Key fields are not valid');
        }
    }
})

router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const comparator = tasks.find((task) => {return task.id === taskId});
    const taskChanges = req.body;

    if(comparator)
    {
        tasks.forEach(task => {
            if(task.id === taskId)
            {
                task.Name = taskChanges.Name ? taskChanges.Name : task.Name
                task.Description = taskChanges.Description ? taskChanges.Description : task.Description;
                task.assignedEmployee.employeeId = taskChanges.assignedEmployee.employeeId ? taskChanges.assignedEmployee.employeeId : task.assignedEmployee.employeeId;
                task.assignedEmployee.employeeRole = taskChanges.assignedEmployee.employeeRole ? taskChanges.assignedEmployee.employeeRole : task.assignedEmployee.employeeRole;
                task.assignedEmployee.employeeName = taskChanges.assignedEmployee.employeeName ? taskChanges.assignedEmployee.employeeName : task.assignedEmployee.employeeName;
                task.status = taskChanges.status ? taskChanges.status : task.status;
            }
        })

        fileSystem.writeFile(jAdress, JSON.stringify(tasks), (err) => {
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.status(200).send('Task has been successfully edited');
            }
        })
    }
    else
    {
        res.status(409).send('Requested id does not exist on database');
    }
})

router.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    const filteredTasks = tasks.filter((task) => {return task.id !== taskId});

    if(filteredTasks.length < tasks.length)
    {
        fileSystem.writeFile(jAdress, JSON.stringify(filteredTasks), (err) => {
            if(err)
            {
                res.status(500).send(err, 'Holatrolo');
            }
            else
            {
                res.status(200).send('Task has been successfully deleted');
            }
        })
    }
    else
    {
        res.status(409).send('Requested id does not exist on database');
    }
});

module.exports = router