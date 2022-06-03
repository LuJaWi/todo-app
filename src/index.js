import "./style.css";

// Create factory function for adding tasks
// Properties for task description, due date, 
// priority, and completion status

// Array for holding the tasks once created
let taskArray = [];

const Task = (taskDescription, dueDate, taskPriority) => {
  taskDescription = taskDescription;
  dueDate = dueDate;
  // Value of 1-5 (1 is lowest)
  taskPriority = taskPriority;
  // Assumes all newly created tasks are not yet completed
  let isComplete = false;
  return {taskDescription, dueDate, taskPriority, isComplete};
};

// Click on Add task converts the button to a task
// creation prompt

// User fills out task creation prompts

// After user hits 'OK', call Task factory function
// using arguments entered by user

// Use new Task object to create HTML object to
// show task details