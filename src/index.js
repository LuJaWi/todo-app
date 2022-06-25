import "./style.css";

const taskWindowSelector = document.querySelector('.to-do-window');
const sidebarSelector = document.querySelector('.sidebar')


const ProjectList = () => {

  // Arrray to hold all child Project Objects
  let projectArray = [];

  // This value will be used to indicate which Project is currently being viewed
  // exported to allow display to manipulate activeProject
  let currentProjectIndex = 0;

  const addProject = (name) => {
    let newProject = Project(name);
    projectArray.push(newProject)
    return {newProject}
  }

  const removeProject = () => {}

  const Project = (name) => {

    let projectName = name;

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
  
    return {projectName, projectTaskArray, addTaskToProject, removeTaskFromProject};
  };

  return {Project, addProject, removeProject, projectArray, currentProjectIndex};
};

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
      userProjectList.Project.removeTaskFromProject(task.id);
      newTask.remove();
    });

    const removeButton = document.createElement('div');
    removeButton.classList.add('remove-button');
    removeButton.innerText = "Remove";
    removeButton.addEventListener('click', () => {
      userProjectList.Project.removeTaskFromProject(task.id);
      newTask.remove();
    });

    options.appendChild(completedButton);
    options.appendChild(removeButton);

    newTask.appendChild(options);

    document.querySelector('.to-do-window').appendChild(newTask);

  }

  const displayProject = (Project) => {
    for (task in userProjectList.Project.projectTaskArray) {
      displayTask(task);
    };
    taskWindowSelector.appendChild(showAddTaskButton());
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
      const newTask = userProjectList.projectArray[userProjectList.currentProjectIndex].addTaskToProject();
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

    const projectNameField = document.createElement('input');
    projectNameField.setAttribute('size', 'inherit');
    projectNameField.type = 'text';
    projectNameField.id = 'project-description';
    projectNameField.classList.add('add-project-field');

    const submitButton = document.createElement('div');
    submitButton.classList.add('submit')
    submitButton.classList.add('new-project-choice')
    submitButton.innerText = '✓'
    submitButton.addEventListener('click', () => {
      prompt.remove()
      const {newProject} = userProjectList.addProject(projectNameField.value);
      addProjectToSideBar(newProject);
      userProjectList.currentProjectIndex = (userProjectList.projectArray.length - 1)
      updateLocalStorage(userProjectList);
      document.querySelector('.sidebar').appendChild(showNewProjectButton())
    })

    const declineButton = document.createElement('div');
    declineButton.classList.add('discard')
    declineButton.classList.add('new-project-choice')
    declineButton.innerText = 'X'
    declineButton.addEventListener('click', () => {
      prompt.remove()
      document.querySelector('.sidebar').appendChild(showNewProjectButton())
    })

    const projectSubmitButtons = document.createElement('div');
    projectSubmitButtons.classList.add('project-choice-options')

    prompt.appendChild(projectNameField)

    projectSubmitButtons.appendChild(declineButton)
    projectSubmitButtons.appendChild(submitButton)

    prompt.appendChild(projectSubmitButtons)

    return prompt
  }

  const addProjectToSideBar = (project) => {
    const newProjectSidebarElement = document.createElement('div');
    newProjectSidebarElement.classList.add('project')

    newProjectSidebarElement.innerText = project.projectName

    sidebarSelector.appendChild(newProjectSidebarElement);
  }

  const loadProjects = (projectList) => {
    for (let project in projectList.projectArray) {
      addProjectToSideBar(projectList.projectArray[project])
    }
  }

  return {showNewProjectButton, loadProjects};
})();

function updateLocalStorage(projectList) {
  localStorage.setItem('savedData', JSON.stringify(projectList));
}

let userProjectList = ProjectList()

if (localStorage.key(0)) {
  let savedUserData = JSON.parse(localStorage.getItem('savedData'))
  userProjectList.currentProjectIndex = savedUserData.currentProjectIndex
  userProjectList.projectArray = savedUserData.projectArray
  Display.loadProjects(userProjectList)
}
console.log(userProjectList)

sidebarSelector.appendChild(Display.showNewProjectButton())