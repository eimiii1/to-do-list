import addIcon from "./icons/add-button.png";
import searchIcon from "./icons/search.png";
import viewIcon from "./icons/projects.png";
import projectDropdownIcon from "./icons/project-dropdown.png";
import hashtagIcon from "./icons/hashtag.png";
import { renderAddTask } from "./addTask.js";
import { deleteTask } from "./displayProject.js";
import deleteIcon from "./icons/delete.png";
import { displayProject } from "./displayProject.js";
import { getDefaultOptions } from "date-fns";

const divContent = document.querySelector("#content");

class Table {
  constructor(project) {
    this.project = project;
  }

  render() {
    const tableBar = document.querySelector(".table-bar");
    tableBar.innerHTML = "";

    const table = document.createElement("div");
    table.classList.add("table");
    tableBar.append(table);

    const title = document.createElement("h1");
    title.textContent = this.project.title;
    table.append(title);

    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList.add("add-task-container");
    table.append(addTaskContainer)
    
    const add = document.createElement("img");
    add.src = addIcon;
    addTaskContainer.append(add)
    
    const addTask = document.createElement("h4");
    addTask.classList.add("add-task");
    addTask.textContent = "Add Task";
    addTaskContainer.append(addTask)
    
    const addTaskInput = document.createElement("input");
    addTaskInput.classList.add("add-task-input");
    addTaskInput.placeholder = "Bakla"
    addTaskContainer.append(addTaskInput)


    const contents = document.createElement("div");
    contents.classList.add("description-contents");
    table.append(contents);


    addTaskContainer.addEventListener("click", () => {
      alert("bakla");
    })
    

    for (const task of this.project.tasks) {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");
      contents.append(taskContainer);

      const taskName = document.createElement("p");
      taskName.classList.add("task-name");
      taskName.textContent = task.description;
      taskContainer.append(taskName);

      const completedBtn = document.createElement("button");
      completedBtn.classList.add("completed-btn");
      completedBtn.textContent = "Completed";
      taskName.append(completedBtn);


      const taskNote = document.createElement("p");
      taskNote.classList.add("task-note");
      taskNote.textContent = task.note;
      taskContainer.append(taskNote)
    }
  }
}

window.onload = () => {
  const default_project = defaultProject();
  const table = new Table(default_project);
  table.render();
};

function defaultProject() {
  return {
    title: "Routine",
    tasks: [
      {
        description: "Do a weekly review of my tasks and goals",
        note: "",
        dueDate: "31 Aug",
        priority: "High",
      },
      {
        description: "Add more personal routines",
        note: "eg: pay taxes yearly, empty the bins weekly, meditate for 10 mins ev weekend at 9 am",
        dueDate: "Sep 27",
        priority: "Medium",
      },
    ],
    atRender: () => {
      console.log("tanignamo");
    },
  };
}

export function initApp() {
  renderPage();
}

function renderPage() {
  const sideBar = document.createElement("div");
  sideBar.classList.add("side-bar");

  const table = document.createElement("div");
  table.classList.add("table-bar");

  divContent.append(sideBar);
  divContent.append(table);

  // side bar
  const header = sidebarHeader();
  sideBar.appendChild(header.header());

  const options = sidebarOptions();
  sideBar.appendChild(options.options());

  const container = projectContainer();
  sideBar.appendChild(container.projectsContainer());

  const optionButtons = document.querySelectorAll(".option-button");
  optionButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      if (index === 0) {
        renderAddTask();
      } else {
        console.log("gago");
      }
    });
  });

  const def = defaultProject();
  def.atRender();
}

function sidebarHeader() {
  const header = document.createElement("div");
  header.classList.add("sidebar-header");

  const username = document.createElement("h1");
  username.classList.add("username");
  username.textContent = "John";

  header.appendChild(username);

  return {
    header() {
      return header;
    },
  };
}

function sidebarOptions() {
  const options = document.createElement("div");
  options.classList.add("options");

  const buttons = [
    {
      buttonName: "Add task",
      buttonImg: addIcon,
    },
    {
      buttonName: "Search",
      buttonImg: searchIcon,
    },
    {
      buttonName: "View projects",
      buttonImg: viewIcon,
    },
  ];

  for (const button of buttons) {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("option-button");
    options.appendChild(optionContainer);

    const optionIMG = document.createElement("img");
    optionIMG.src = button.buttonImg;

    const optionButton = document.createElement("h1");
    optionButton.textContent = button.buttonName;

    optionContainer.append(optionIMG);
    optionContainer.append(optionButton);
  }

  return {
    options() {
      return options;
    },
  };
}

function projectContainer() {
  const projectsContainer = document.createElement("div"); // main container for project dropdown
  projectsContainer.classList.add("projects-container");

  const projectTabs = document.createElement("div"); // the project tab which you click to dropdown
  projectTabs.classList.add("project-tabs");
  projectsContainer.appendChild(projectTabs);

  const projectHeader = document.createElement("h1"); // the title of that project tab
  projectHeader.textContent = "My Projects";
  projectTabs.append(projectHeader);

  const projectArrow = document.createElement("img"); // the arrow icon used to indicate the dropdown
  projectArrow.src = projectDropdownIcon;
  projectTabs.append(projectArrow);

  const projectDropdown = document.createElement("div"); // the actual dropdown if you toggle it
  projectDropdown.classList.add("project-dropdown");
  projectsContainer.append(projectDropdown);

  const list = projectList();

  projectDropdown.append(list.List());

  projectArrow.addEventListener("click", () => {
    document.querySelector(".project-tabs img").classList.toggle("active");
    if (
      projectDropdown.style.height &&
      projectDropdown.style.height !== "0px"
    ) {
      projectDropdown.style.height = "0px";
    } else {
      projectDropdown.style.height = projectDropdown.scrollHeight + "px";
    }
  });

  return {
    projectsContainer() {
      return projectsContainer;
    },
  };
}

export function projectList() {
  const defProject = defaultProject();
  const projectList = document.createElement("ul");
  projectList.classList.add("project-list");

  // get json
  const parseData = localStorage.getItem("projects");
  let projects = parseData ? JSON.parse(parseData) : [];

  if (!projects || projects.length === 0) {
    projects = [defProject];
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function render() {
    projectList.innerHTML = "";
    projects.forEach((proj, index) => {
      const project = document.createElement("li");
      project.innerHTML = `<img src="${hashtagIcon}"> ${proj.title} <img class="delete-button" src=${deleteIcon}>`;
      projectList.append(project);

      const deleteBtn = project.querySelector(".delete-button");
      deleteBtn.addEventListener("click", () => {
        projects = projects.filter((_, i) => i !== index);
        localStorage.setItem("projects", JSON.stringify(projects));
        render();
        console.log(projects);
      });
    });
  }
  render();

  console.log(projects);

  return {
    List() {
      return projectList;
    },
  };
}

export function updateProjectList() {
  const getProjects = document.querySelector(
    ".side-bar .projects-container .project-dropdown"
  );
  getProjects.innerHTML = "";

  const list = projectList().List();
  getProjects.append(list);
}
