const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});  
        res.status(200).json({tasks});      
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const getTask = async (req, res) => {
    // res.json({id:req.params.id});
    try {
        const {id: TaskID} = req.params;
        const task = await Task.findOne({_id: TaskID});  
        if(!task){
            return res.status(404).json({msg: 'No task with ID: ' + TaskID});
        }

        res.status(200).json({task});      
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id: TaskID} = req.params;
        const task = await Task.findOneAndDelete({_id: TaskID});
        if(!task){
            return res.status(404).json({msg: 'No task with ID: ' + TaskID});
        }

        res.status(200).json({task: null, status: 'success'});    
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const updateTask = async (req, res) => {
    try {
        const {id: TaskID} = req.params;
        const task = await Task.findByIdAndUpdate({_id: TaskID}, req.body, {
            new: true,
            runValidators: true,
            // overwrite:true, //PUT
        });
        if(!task){
            return res.status(404).json({msg: 'No task with ID: ' + TaskID});
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};






