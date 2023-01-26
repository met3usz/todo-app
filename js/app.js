{
  const tasks = [
    { content: 'kupic mleko', done: false },
    { content: 'zjeść kolację', done: true },
  ];

  const clear = () => {
    const newTask = document.querySelector('.js-newTask');
    newTask.value = '';
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const remove = () => {
    const removeButtons = document.querySelectorAll('.js-remove');

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener('click', () => {
        removeTask(index);
      });
    });
  };

  const toggleDone = () => {
    const toggleDoneButtons = document.querySelectorAll('.js-done');

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener('click', () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = '';

    for (task of tasks) {
      htmlString += `
      <li class="item">
      <button class="item__button item__button-done js-done">${
        task.done ? '✅' : ''
      }</button>
      <p class="item__content" ${
        task.done ? 'style = "text-decoration: line-through"' : ''
      }>${task.content}</p>
      <button class="item__button item__button-remove js-remove">🗑️</button>
      </li>
      `;
    }
    document.querySelector('.js-tasks').innerHTML = htmlString;

    remove();
    toggleDone();
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
