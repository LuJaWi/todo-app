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

const addTask = () => {
  const addTaskElement = document.createElement('div');
  addTaskElement.classList.add('add-task-prompt');

  const formElement = document.createElement('form');
  formElement.classList.add('task-form');
  addTaskElement.appendChild(formElement);

  // Task Descripition Field
  const taskDescriptionLabel = document.createElement('label');
  taskDescriptionLabel.htmlFor = 'task-description';
  taskDescriptionLabel.innerText = 'What Needs Doing?';
  taskDescriptionLabel.classList.add('add-task-field');

  const taskDescriptionInput = document.createElement('input');
  taskDescriptionInput.type = 'text';
  taskDescriptionInput.name = 'task-description';
  taskDescriptionInput.classList.add('add-task-field');

  // Task Priority Field
  const taskPriorityLabel = document.createElement('label');
  taskPriorityLabel.htmlFor = 'task-priority';
  taskPriorityLabel.innerText = 'How Important Is It?';
  taskPriorityLabel.classList.add('add-task-field');

  const taskPriorityInput = document.createElement('input');
  taskPriorityInput.setAttribute('list', 'task-priority');

  const taskPriorityList = document.createElement('datalist');
  taskPriorityList.id = 'task-priority'
  for (let i=1; i<=5; i++) {
    const taskPriortyOption = document.createElement('option');
    taskPriortyOption.setAttribute('value', String(i));
    taskPriorityList.appendChild(taskPriortyOption);
  };
  taskPriorityInput.appendChild(taskPriorityList);
  taskPriorityInput.classList.add('add-task-field');

  // Task Due Date Field
  const taskDueDateLabel = document.createElement('label');
  taskDueDateLabel.htmlFor = 'task-due-date';
  taskDueDateLabel.innerText = 'When Do You Need This Done By?';
  taskDueDateLabel.classList.add('add-task-field');

  const taskDueDateInput = document.createElement('input');
  taskDueDateInput.type = 'date';
  taskDueDateInput.id = 'task-due-date';
  taskDueDateInput.name = 'due-date'
  taskDueDateInput.classList.add('add-task-field');

  // Submit or discard buttons
  const taskConfirmation = document.createElement('div');
  taskConfirmation.classList.add('task-confirmation');

  const submitButton = document.createElement('div');
  submitButton.classList.add('task-confirmation-button', 'submit');
  submitButton.innerText = 'Add';

  const discardButton = document.createElement('div');
  discardButton.classList.add('task-confirmation-button', 'discard');
  discardButton.innerText = 'Nevermind';

  taskConfirmation.appendChild(submitButton);
  taskConfirmation.appendChild(discardButton);

  // Append fields to form
  formElement.appendChild(taskDescriptionLabel);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskDescriptionInput);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskPriorityLabel);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskPriorityInput);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskDueDateLabel);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskDueDateInput);
  formElement.appendChild(document.createElement('br'));
  formElement.appendChild(taskConfirmation);

  return addTaskElement;
};

const taskWindowSelector = document.querySelector('.to-do-window');

taskWindowSelector.appendChild(addTask());

// Click on Add task converts the button to a task
// creation prompt

// User fills out task creation prompts

// After user hits 'OK', call Task factory function
// using arguments entered by user

// Use new Task object to create HTML object to
// show task details