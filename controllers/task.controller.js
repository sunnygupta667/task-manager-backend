import Task from '../models/task.model.js';

// Get all tasks
const getAllTasks = async(req, res)=>{
  try {
    const { status, priority } = req.query;
    let filter = {};
    
    if (status) {
      filter.completed = status === 'completed';
    }
    
    if (priority) {
      filter.priority = priority;
    }
    
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task 
const getTaskById = async(req, res)=>{
try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    res.status(200).json(task);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}


// Create a new task 
const createTask = async(req, res)=>{
  const { title, description, priority } = req.body;
  try{
     const task = new Task({
      title,
      description,
      priority: priority || 'medium', // default to medium if not provided
     })
      await task.save();
      res.status(201).json(task);
  }
  catch(error){
    res.status(400).json({message: error.message});
  }
}

// Update a task
const updateTask = async(req, res)=>{
  const { title, description, completed, priority } = req.body;
  try{
   const task = await Task.findById(req.params.id);
   if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    task.title= title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    task.priority = priority || task.priority;
    task.updatedAt = Date.now(); // Update the updatedAt field

    await task.save();
    res.status(200).json(task);
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
}

// Delete a task 
const deleteTask = async(req, res)=>{
  try{
     const task = await Task.findByIdAndDelete(req.params.id);
     if(!task){
       return res.status(404).json({message: "Task not found"});
     }
     res.status(204).json({message: "Task deleted successfully"});
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}
// Toggle task completion status\
const toggleTaskCompletion = async(req, res)=>{
  try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    task.completed = !task.completed; // Toggle the completion status
    task.updatedAt = Date.now(); // Update the updatedAt field
    await task.save();
    res.status(200).json(task);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
};