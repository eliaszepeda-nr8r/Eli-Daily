const STORAGE_KEY = "eli-daily-tracker-v1";

const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  focus: [],
  today: [],
  later: [],
  notes: ""
};

const lists = {
  focus: document.getElementById("focusList"),
  today: document.getElementById("todayList"),
  later: document.getElementById("laterList")
};

const template = document.getElementById("taskTemplate");
const notes = document.getElementById("notes");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStats();
}

function newTask(text = "") {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    text,
    completed: false
  };
}

function addTask(listName, text = "") {
  if (listName === "focus" && state.focus.length >= 3) {
    alert("Keep your focus list to 3. Move something out before adding another.");
    return;
  }

  const task = newTask(text);
  state[listName].push(task);
  save();
  render();

  requestAnimationFrame(() => {
    const input = document.querySelector(`[data-id="${task.id}"] .task-text`);
    if (input) input.focus();
  });
}

function renderTask(task, listName) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.id = task.id;
  node.classList.toggle("completed", task.completed);

  const input = node.querySelector(".task-text");
  const check = node.querySelector(".check");
  const del = node.querySelector(".delete");

  input.value = task.text;

  input.addEventListener("input", () => {
    task.text = input.value;
    save();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask(listName);
    }
  });

  check.addEventListener("click", () => {
    task.completed = !task.completed;
    save();
    render();
  });

  del.addEventListener("click", () => {
    state[listName] = state[listName].filter(t => t.id !== task.id);
    save();
    render();
  });

  return node;
}

function render() {
  Object.entries(lists).forEach(([name, container]) => {
    container.innerHTML = "";
    state[name].forEach(task => container.appendChild(renderTask(task, name)));
  });

  notes.value = state.notes;
  updateStats();
}

function updateStats() {
  const allTasks = [...state.focus, ...state.today, ...state.later];
  const completed = allTasks.filter(t => t.completed).length;
  const total = allTasks.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("progressText").textContent = `${completed} of ${total} done`;
  document.getElementById("progressBar").style.width = `${percentage}%`;
  document.getElementById("todayCount").textContent = `${state.today.filter(t => !t.completed).length} left`;
  document.getElementById("laterCount").textContent = `${state.later.filter(t => !t.completed).length} saved`;
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => addTask(button.dataset.list));
});

document.getElementById("clearDoneBtn").addEventListener("click", () => {
  Object.keys(lists).forEach(name => {
    state[name] = state[name].filter(task => !task.completed);
  });
  save();
  render();
});

notes.addEventListener("input", () => {
  state.notes = notes.value;
  save();
});

const today = new Date();
document.getElementById("dateHeading").textContent = today.toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric"
});

render();
