import "./style.css";

// Array to hold all the project arrays. This array will be held in
// Local storage to allow the data to be persistant after the 
// browser has closed.


// Prompt user to create a new project, this will call the Project 
// factory function and push this new project to the project array,
// which is where it will be referenced for future access.
const ProjectList = (() => {

  const addProject = (name) => {
    let newProject = Project
    newProject.projectName = name;
    projectArray.push(newProject)
  }

  const removeProject = () => {}

  let projectArray = [];

  const Project = (() => {

    let projectName = "";

    // Array of task objects for project
    const projectTaskArray = [];
  
    // create task objects
    const Task = (description, dueDate, priority) => {
      // create a unique ID for the task that can be used to reference the task object
      const id = Date.now()
      return {description, dueDate, priority, id}
    };
  
    // Uses new task prompt fields to populate object info
    const addTaskToProject = () => {
      const description = document.getElementById('task-description').value;
      const dueDate = document.getElementById('task-due-date').value;
      const taskPrioritySelector = document.getElementById('task-priority');
      const priority = taskPrioritySelector.options[taskPrioritySelector.selectedIndex].value;
  
      let newTask = Task(description, dueDate, priority);
      projectTaskArray.push(newTask);
      updateLocalStorage();
      return newTask;
    };
  
    // Remove task from project array
    const removeTaskFromProject = (valueToMatch) => {
      for (let task in projectTaskArray) {
        if (projectTaskArray[task].id == valueToMatch) {
          projectTaskArray.splice(task, 1);
        }
      };
    };
  
    // updates local storage with the current projectTaskArray
    const updateLocalStorage = () => {
      localStorage.setItem("projectTaskArray", JSON.stringify(projectTaskArray));
      console.log(JSON.parse(localStorage.getItem("projectTaskArray")))
    }
  
    return {projectName, projectTaskArray, addTaskToProject, removeTaskFromProject};
  })();

  return {Project, addProject, removeProject, projectArray};
})();

let newProject = ProjectList;
newProject.addProject("ProjectName")
console.log(newProject)

const Display = (() => {
  const displayTask = (task) => {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    
    const details = document.createElement('div');
    details.classList.add('details');

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = task.description;

    const priority = document.createElement('div');
    priority.classList.add('priority');
    priority.innerText = task.priority;

    const dueDate = document.createElement('div');
    dueDate.classList.add('dueDate');
    dueDate.innerText = "Due: " + task.dueDate;

    details.appendChild(description);
    details.appendChild(dueDate);
    details.appendChild(priority);

    newTask.appendChild(details);

    const options = document.createElement('options');
    options.classList.add('options');

    // Clicking the "Done" button will just remove the 
    // task object for now, eventually would like to 
    // move completed tasks to a "completed" list.
    const completedButton = document.createElement('div');
    completedButton.classList.add('completed-button');
    completedButton.innerText = "Done!";
    completedButton.addEventListener('click', () => {
      ProjectList.Project.removeTaskFromProject(task.id);
      newTask.remove();
    });

    const removeButton = document.createElement('div');
    removeButton.classList.add('remove-button');
    removeButton.innerText = "Remove";
    removeButton.addEventListener('click', () => {
      ProjectList.Project.removeTaskFromProject(task.id);
      newTask.remove();
    });

    options.appendChild(completedButton);
    options.appendChild(removeButton);

    newTask.appendChild(options);

    document.querySelector('.to-do-window').appendChild(newTask);

  }

  const displayNewProject = (Project) => {
    for (task in ProjectList.Project.projectTaskArray) {
      displayTask(task);
    };
  };

  const showAddTaskButton = () => {
    const addTaskButton = document.createElement('div');
    addTaskButton.classList.add('add-task-button');
    addTaskButton.innerText = 'Add Task';
    addTaskButton.addEventListener('click', () => {
      document.querySelector('.to-do-window').appendChild(promptForNewTask());
      addTaskButton.remove();
    });

    return addTaskButton;
  };

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
      const newTask = ProjectList.Project.addTaskToProject()
      displayTask(newTask);
      addTaskElement.remove();
      taskWindowSelector.appendChild(showAddTaskButton());
    });
  

    const discardButton = document.createElement('div');
    discardButton.classList.add('task-confirmation-button', 'discard');
    discardButton.innerText = 'Nevermind';
    discardButton.addEventListener('click', () => {
      addTaskElement.remove();
      taskWindowSelector.appendChild(showAddTaskButton());
    });

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

  const showNewProjectButton = () => {

    const newProjectButton = document.createElement('div');
    newProjectButton.classList.add('new-project')
    newProjectButton.classList.add('project')
    newProjectButton.innerText = "+ New Project"
    
    newProjectButton.addEventListener('click', () => {
      newProjectButton.remove()
      document.querySelector('.sidebar').appendChild(promptForNewProject())
    })

    return newProjectButton
  }

  const promptForNewProject = () => {
    const prompt = document.createElement('form')

    prompt.classList.add('project');
    prompt.type = 'text';
    prompt.id = 'task-description';
    prompt.classList.add('add-task-field');

    const projectNameField = document.createElement('input');
    projectNameField.setAttribute('size', '12');

    const submitButton = document.createElement('div');
    submitButton.classList.add('submit')
    submitButton.classList.add('new-project-choice')
    submitButton.innerText = '✓'
    const declineButton = document.createElement('div');
    declineButton.classList.add('discard')
    declineButton.classList.add('new-project-choice')
    declineButton.innerText = 'X'

    const projectSubmitButtons = document.createElement('div');
    projectSubmitButtons.classList.add('project-choice-options')

    prompt.appendChild(projectNameField)

    projectSubmitButtons.appendChild(declineButton)
    projectSubmitButtons.appendChild(submitButton)

    prompt.appendChild(projectSubmitButtons)

    return prompt
  }

  return {showAddTaskButton, showNewProjectButton};
})();


const taskWindowSelector = document.querySelector('.to-do-window');
const sidebarSelector = document.querySelector('.sidebar')

taskWindowSelector.appendChild(Display.showAddTaskButton());
sidebarSelector.appendChild(Display.showNewProjectButton())