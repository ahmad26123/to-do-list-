document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');


    const toggleEmptyImage = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {

            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';

            const span = document.createElement('span');
            span.textContent = taskText;

            li.appendChild(checkbox);
            li.appendChild(span);



            // const taskItem = document.createElement('li');
            // taskItem.textContent = taskText;
            taskList.appendChild(li);
            taskInput.value = '';
            toggleEmptyImage();
        }
    }


    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    })
})
