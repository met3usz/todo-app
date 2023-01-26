{
  let tasks = [];
  let hideDoneTask = false;

  const hideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;
    render();
  };

  const markAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const clear = () => {
    const newTask = document.querySelector('.js-newTask');
    newTask.value = '';
  };

  const addNewTask = (newTaskContent) => {
    tasks = [{ content: newTaskContent }, ...tasks];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const removeButtonsEvent = () => {
    const removeButtons = document.querySelectorAll('.js-remove');

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener('click', () => {
        removeTask(index);
      });
    });
  };

  const toggleDoneEvent = () => {
    const toggleDoneButtons = document.querySelectorAll('.js-done');

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener('click', () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = '';
    for (task of tasks) {
      htmlString += `
      <li class="item ${task.done && hideDoneTask ? 'item--hiden' : ''}">
      <button class="item__button item__button-done js-done">${
        task.done ? '✔️' : ''
      }</button>
      <p class="item__content" ${
        task.done ? 'style = "text-decoration: line-through"' : ''
      }>${task.content}</p>
      <button class="item__button item__button-remove js-remove">🗑️</button>
      </li>
      `;
    }
    document.querySelector('.js-tasks').innerHTML = htmlString;
    renderTopButtons(htmlString);
  };

  const renderTopButtons = (htmlString) => {
    let buttons = '';
    if (htmlString != '') {
      buttons += `
      <button class="main__button js-allTasksDone" ${
        tasks.every(({ done }) => done) ? 'disabled = "true"' : ''
      }>Ukończ wszystkie</button>
      <button class="main__button js-hideDoneTasks">${
        hideDoneTask ? 'Pokaż' : 'Ukryj'
      }  wykonane</button>
      `;
    }

    document.querySelector('.js-mainButtons').innerHTML = buttons;
  };

  const bindEvents = () => {
    removeButtonsEvent();
    toggleDoneEvent();
  };

  const bindListHeaderEvents = () => {
    const allTaskDoneButton = document.querySelector('.js-allTasksDone');
    if (allTaskDoneButton) {
      allTaskDoneButton.addEventListener('click', () => {
        markAllTaskDone();
      });
    }
    const hideDoneTasksButton = document.querySelector('.js-hideDoneTasks');
    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener('click', () => {
        hideDoneTasks();
      });
    }
  };

  const render = () => {
    renderTasks();
    bindEvents();
    bindListHeaderEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector('.js-newTask').value.trim();
    if (newTaskContent === '') {
      return;
    }
    addNewTask(newTaskContent);
    clear();
  };

  const init = () => {
    render();
    const form = document.querySelector('.js-form');
    form.addEventListener('submit', onFormSubmit);
  };

  init();
}
