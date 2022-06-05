import "./style.css";

// Create factory function for adding tasks
// Properties for task description, due date, 
// priority, and completion status

const TaskTracker = (() => {

  // Creates an HTML element with fields for creating
  // a new task.
  const promptForNewTask = () => {
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
    taskDescriptionInput.id = 'task-description';
    taskDescriptionInput.classList.add('add-task-field');

    // Task Priority Field
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.htmlFor = 'task-priority';
    taskPriorityLabel.innerText = 'How Important Is It?';
    taskPriorityLabel.classList.add('add-task-field');

    const taskPriorityInput = document.createElement('select');
    taskPriorityInput.id = 'task-priority'

    for (let i=1; i<=5; i++) {
      const taskPriortyOption = document.createElement('option');
      taskPriortyOption.setAttribute('value', String(i));
      taskPriortyOption.innerText = String(i);
      taskPriorityInput.appendChild(taskPriortyOption);
    };

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
    submitButton.addEventListener('click', () => {
      console.log(createTaskObject())
    });

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

  // Creates a task element from the user input in the
  // prompt for a new task
  const createTaskObject = () => {
    const taskDescription = document.getElementById('task-description').value;
    const taskDueDate = document.getElementById('task-due-date').value;
    const taskPrioritySelector = document.getElementById('task-priority');
    const taskPriority = taskPrioritySelector.options[taskPrioritySelector.selectedIndex].value;

    return {taskDescription, taskDueDate, taskPriority};
  };

  // Takes a task object and creates an HTML Element
  // to display task information.
  const newTaskElement = () => {

  };

  return {promptForNewTask};
})();

const taskWindowSelector = document.querySelector('.to-do-window');

taskWindowSelector.appendChild(TaskTracker.promptForNewTask());

console.log(TaskTracker.createTaskFromPrompt());
// Click on Add task converts the button to a task
// creation prompt

// User fills out task creation prompts

// After user hits 'OK', call Task factory function
// using arguments entered by user

// Use new Task object to create HTML object to
// show task details