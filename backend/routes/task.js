const router = require('express').Router();
const Task = require('../models/task');
const User = require('../models/user');
const { authenticateToken } = require('./auth');

// create task 

router.post('/create-task', authenticateToken, async (req, res) => {
    try {
        const { title, desc} = req.body;
        const { id } = req.user;
        if (!title || !desc) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newTask = new Task({ title, desc,
            user: id
         });
        const savedTask = await newTask.save();
        const taskId = savedTask._id;
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId } },
            { new: true }
        );
        res.status(201).json({ message: 'Task created successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all tasks
router.get('/get-all-tasks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        // const tasks = await Task.find({ user: id });
        // if (!tasks) {
        //     return res.status(404).json({ message: 'No tasks found' });
        // }

        const userData = await User.findById(id).populate({path: 'tasks', 
            options: { sort: { createdAt: -1 } }});

        res.status(200).json({data: userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// delete task
router.delete('/delete-task/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const {userId} = req.user;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } },
            { new: true }
        );
        res.status(200).json({ message: 'Task deleted successfully' });

       
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// update task

router.put('/update-task/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc} = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, desc }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// update impTask

router.put('/update-imp-Task/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const impTask = taskData.important;
    try {
        const task = await Task.findByIdAndUpdate(id, { important: !impTask }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

// update complete task

router.put('/update-complete-task/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const completeTask = taskData.complete;
    try {
        const task = await Task.findByIdAndUpdate(id, { complete: !completeTask }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get imp tasks
router.get('/get-imp-tasks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        // const tasks = await Task.find({ user: id, important: true });
        // if (!tasks) {
        //     return res.status(404).json({ message: 'No tasks found' });
        // }
        // res.status(200).json({ data: tasks });
        const userData = await User.findById(id).populate({path: 'tasks', 
            match: { important: true },
            options: { sort: { createdAt: -1 } }});

        const impTasks = userData.tasks;
        res.status(200).json({data: impTasks});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get completed tasks

router.get('/get-completed-tasks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        // const tasks = await Task.find({ user: id, complete: true });

        const userData = await User.findById(id).populate({path: 'tasks',
            match: { complete: true },
            options: { sort: { createdAt: -1 } }});
        const completedTasks = userData.tasks;

        res.status(200).json({data: completedTasks});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
});

// get incomplete tasks

router.get('/get-incomplete-tasks', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user;
        // const tasks = await Task.find({ user: id, complete: false });
        // if (!tasks) {
        //     return res.status(404).json({ message: 'No tasks found' });
        // }
        const userData = await User.findById(id).populate({path: 'tasks',
            match: { complete: false },
            options: { sort: { createdAt: -1 } }});
        const incompleteTasks = userData.tasks;
        res.status(200).json({data: incompleteTasks});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;