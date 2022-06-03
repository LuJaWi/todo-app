import "./style.css";

// Create factory function for adding tasks
// Properties for task description, due date, 
// priority, and completion status

const TaskCreator = () => {
  let taskDescription = "";
  let dueDate = 0;
  // Value of 1-5 (1 is lowest)
  let taskPriority = 3;
  let isComplete = false;
  return {taskDescription, dueDate, taskPriority, isComplete};
};