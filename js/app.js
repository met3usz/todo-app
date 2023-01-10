{
  const tasks = [
    { content: 'kupic mleko', done: false },
    { content: 'zjeść kolację', done: true },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
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

  const render = () => {
    let htmlString = '';

    for (task of tasks) {
      htmlString += `
      <li
        ${task.done ? 'style = "text-decoration: line-through"' : ''}>
        <button class="js-remove">usuń</button>
        ${task.content}
      </li>
      `;
    }
    document.querySelector('.js-tasks').innerHTML = htmlString;

    remove();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector('.js-newTask').value.trim();
    if (newTaskContent === '') {
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector('.js-form');
    form.addEventListener('submit', onFormSubmit);
  };

  init();
}
