{
  const tasks = [
    { content: 'kupic mleko', done: false },
    { content: 'zjeść kolację', done: true },
  ];

  const render = () => {
    let htmlString = '';

    for (task of tasks) {
      htmlString += `
      <li
        ${task.done ? 'style = "text-decoration: line-through"' : ''}>
        ${task.content}
      </li>
      `;
    }
    document.querySelector('.js-tasks').innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
