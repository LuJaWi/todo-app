import "./style.css";

// Create factory function for adding tasks
// Properties for task description, due date, 
// priority, and completion status

// Array for holding the tasks once created
let taskArray = [];

const TaskCreator = (taskDescription, dueDate, taskPriority) => {
  taskDescription = taskDescription;
  dueDate = dueDate;
  // Value of 1-5 (1 is lowest)
  taskPriority = taskPriority;
  let isComplete = false;
  return {taskDescription, dueDate, taskPriority, isComplete};
};

let testTask = TaskCreator("Test Description", 1, 4);

console.log(testTask);