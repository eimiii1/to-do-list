import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isBefore,
  subMonths,
  addMonths,
  isSameMonth,
  isToday,
  isSameYear,
} from "date-fns";
import prevMonth from "./icons/prev-month.png";
import nextMonth from "./icons/next-month.png";
import flag_1 from "./icons/flag-1.png";
import flag_2 from "./icons/flag-2.png";
import flag_3 from "./icons/flag-3.png";
import flag_4 from "./icons/flag-4.png";
import { updateProjectList } from "./source.js";

const addTask = () => {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const project = {
    title: inputTitle.value,
    todo: [
      {
        description: inputDesc.value,
        date: inputDate.textContent,
        priority: selectPriority.textContent,
      },
    ],
  };

  projects.push(project);
  console.log(projects);

  // save as json
  localStorage.setItem("projects", JSON.stringify(projects));
  updateProjectList();
  addPopUp.classList.remove("show");
  resetAddTask();
};

function resetAddTask() {
  inputTitle.value = "";
  inputDesc.value = "";
  inputDate.remove();
  selectPriority.textContent = "Priority";
}

const addPopUp = document.createElement("div");
addPopUp.classList.add("add-pop-up");

const inputs = document.createElement("div");
inputs.classList.add("inputs");
addPopUp.appendChild(inputs);

const inputTitleContainer = document.createElement("div");
inputTitleContainer.classList.add("input-title-container");
inputs.append(inputTitleContainer);

const inputDate = document.createElement("div");
inputDate.classList.add("input-date");
inputTitleContainer.append(inputDate);

const inputTitle = document.createElement("input");
inputTitle.classList.add("input-title");
inputTitle.type = "text";
inputTitle.placeholder = "Title";
inputTitleContainer.appendChild(inputTitle);

const inputDesc = document.createElement("input");
inputDesc.classList.add("input-desc");
inputDesc.type = "text";
inputDesc.placeholder = "Description";
inputs.appendChild(inputDesc);

const inputButtons = document.createElement("div");
inputButtons.classList.add("input-buttons");
addPopUp.appendChild(inputButtons);

const dateDiv = document.createElement("div");
dateDiv.classList.add("date-div");
inputButtons.appendChild(dateDiv);

const priorityDiv = document.createElement("div");
priorityDiv.classList.add("priority-div");
inputButtons.appendChild(priorityDiv);

const selectDate = document.createElement("button");
selectDate.textContent = "Date";
selectDate.title = "OPTIONAL";
inputButtons.appendChild(selectDate);

const selectPriority = document.createElement("button");
selectPriority.classList.add("select-priority");
selectPriority.textContent = "Priority";
selectPriority.title = "OPTIONAL";
priorityDiv.appendChild(selectPriority);

inputDate.addEventListener("click", () => {
  inputDate.innerHTML = "";
  inputDate.classList.remove("show");
});

export function renderAddTask() {
  const table = document.querySelector(".table-bar");
  if (!table) {
    console.error("Table bar element not found");
    return;
  }

  if (!table.contains(addPopUp)) {
    table.appendChild(addPopUp);
  }

  addPopUp.classList.toggle("show");
}

let currentMonth = new Date();

const calendarDays = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return days;
};

const calendarDates = () => {
  const date = currentMonth;
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  let day = calendarStart;
  const calendarDays = [];

  while (day <= calendarEnd) {
    calendarDays.push({
      date: day,
      isInactive: !isSameMonth(day, date),
      isToday: isToday(day),
    });
    day = addDays(day, 1);
  }

  return calendarDays;
};

// Calendar UI
const renderCalendar = () => {
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");

  const calendarHeader = document.createElement("div"); // Header
  calendarHeader.classList.add("calendar-header");
  calendar.append(calendarHeader);

  const prevBtn = document.createElement("img"); // Previous Button (Change month)
  prevBtn.id = "prev-btn";
  prevBtn.src = prevMonth;
  calendarHeader.append(prevBtn);

  const current = document.createElement("h2"); // Month display
  current.textContent = format(currentMonth, "MMM yyyy");
  calendarHeader.append(current);

  const nextBtn = document.createElement("img"); // Next Button (Change month)
  nextBtn.id = "next-btn";
  nextBtn.src = nextMonth;
  calendarHeader.append(nextBtn);

  // Condition to stop navigating to past months
  const today = new Date();
  if (!isBefore(startOfMonth(today), startOfMonth(currentMonth))) {
    prevBtn.style.opacity = "0.5";
    prevBtn.style.pointerEvents = "none";
  } else {
    prevBtn.style.opacity = "";
    prevBtn.style.pointerEvents = "";
  }

  // Calendar Navigation
  prevBtn.addEventListener("click", () => {
    currentMonth = subMonths(currentMonth, 1);
    dateDiv.innerHTML = "";
    const newCalendar = renderCalendar();
    newCalendar.classList.add("show");
    dateDiv.append(newCalendar);
  });
  nextBtn.addEventListener("click", () => {
    currentMonth = addMonths(currentMonth, 1);
    dateDiv.innerHTML = "";
    const newCalendar = renderCalendar();
    newCalendar.classList.add("show");
    dateDiv.append(newCalendar);
  });

  calendar.addEventListener("click", (e) => e.stopPropagation());

  const daysContainer = document.createElement("div"); // Container that holds the days (Mon, Tue, Wed, etc.)
  daysContainer.classList.add("days-container");
  calendar.append(daysContainer);

  const days = calendarDays();

  days.forEach((days) => {
    const eachDay = document.createElement("p");
    eachDay.textContent = days;
    daysContainer.append(eachDay);
  });

  const datesContainer = document.createElement("div");
  datesContainer.classList.add("dates-container");
  calendar.append(datesContainer);

  const dates = calendarDates();
  dates.forEach((date) => {
    const eachDate = document.createElement("p");
    eachDate.classList.add("each-date");
    eachDate.textContent = format(new Date(date.date), "d");
    datesContainer.append(eachDate);

    if (date.isInactive) {
      eachDate.classList.add("inactive");
    }
    if (date.isToday) {
      eachDate.classList.add("today");
    }
    eachDate.addEventListener("click", () => {
      if (isSameYear(date.date, today)) {
        inputDate.innerHTML = format(new Date(date.date), "MMM d");
        inputDate.classList.add("show");

        document.querySelectorAll(".each-date.selected").forEach((sd) => {
          sd.classList.remove("selected");
        });
        eachDate.classList.add("selected");
      } else {
        inputDate.innerHTML = format(new Date(date.date), "MMM d yyyy");

        document.querySelectorAll(".each-date.selected").forEach((sd) => {
          sd.classList.remove("selected");
        });
        eachDate.classList.add("selected");
      }
    });
  });

  return calendar;
};

selectDate.addEventListener("click", (e) => {
  e.stopPropagation();
  const calendar = dateDiv.querySelector(".calendar");

  if (calendar) {
    calendar.classList.toggle("show");
  } else {
    dateDiv.append(renderCalendar());
    const newCalendar = dateDiv.querySelector(".calendar");
    newCalendar.classList.add("show");
  }
});

document.addEventListener("click", () => {
  const calendar = dateDiv.querySelector(".calendar");
  if (calendar) {
    calendar.classList.remove("show");
  }
});

dateDiv.addEventListener("click", (e) => e.stopPropagation());

const setPriority = (getPriority) => {
  const priorityButton = priorityDiv.querySelector(".select-priority");
  priorityButton.textContent = getPriority;
  return priorityButton;
};

// Priority UI
const renderPriority = () => {
  const priority = document.createElement("div");
  priority.classList.add("priority");
  priorityDiv.append(priority);

  const priorities = [
    {
      priority: 1,
      description: "Priority 1",
      flag: flag_1,
    },
    {
      priority: 2,
      description: "Priority 2",
      flag: flag_2,
    },
    {
      priority: 3,
      description: "Priority 3",
      flag: flag_3,
    },
    {
      priority: 4,
      description: "Priority 4",
      flag: flag_4,
    },
  ];

  for (const prio of priorities) {
    const prios = document.createElement("div");
    prios.classList.add("priority-container");
    priority.append(prios);

    const prioFlag = document.createElement("img");
    prioFlag.id = "flag-1";
    prioFlag.src = prio.flag;
    prios.append(prioFlag);

    const prioDesc = document.createElement("p");
    prioDesc.classList.add("prio-description");
    prioDesc.innerHTML = prio.description;
    prios.append(prioDesc);
  }

  const getPriority = priority.querySelectorAll(".priority-container");
  getPriority.forEach((prio) => {
    prio.addEventListener("click", () => {
      setPriority(prio.textContent);
      priority.classList.toggle("show");
    });
  });

  return priority;
};

const priority = renderPriority();

selectPriority.addEventListener("click", () => {
  if (selectPriority) {
    priority.classList.toggle("show");
  }
});

function renderButtons() {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  addPopUp.append(buttonsContainer);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  buttonsContainer.append(cancelButton);

  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add Task";
  buttonsContainer.append(addTaskButton);

  function updateButtonState() {
    if (inputTitle.value.trim() !== "" && inputDesc.value.trim() !== "") {
      addTaskButton.style.opacity = "1";
      addTaskButton.style.pointerEvents = "auto";
    } else {
      addTaskButton.style.opacity = "0.5";
      addTaskButton.style.pointerEvents = "none";
    }
  }

  inputTitle.addEventListener("input", updateButtonState);
  inputDesc.addEventListener("input", updateButtonState);

  return {
    cancel: cancelButton,
    add: addTaskButton,
    state: updateButtonState,
  };
}

const selectButton = renderButtons();

selectButton.cancel.addEventListener("click", () => {
  addPopUp.classList.toggle("show");
});

selectButton.add.addEventListener("click", addTask);
