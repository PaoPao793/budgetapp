function addTodo() {
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const value = input.value.trim();

    if (value) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div id="listItem">
                <input type="checkbox" class="todo-checkbox" onclick="toggleComplete(this)">
                <span class="todo-text">${value}</span>
                <button class="delete-btn" onclick="deleteTodo(this)">x</button>
            </div>
        `;
        list.appendChild(li);
        input.value = '';
    }
}

function deleteTodo(button) {
    const li = button.parentElement;
    li.remove();
}

function toggleComplete(checkbox) {
    const todoText = checkbox.nextElementSibling;
    const listItem = checkbox.closest("#listItem");
    todoText.classList.toggle('completed', checkbox.checked);   
    listItem.classList.toggle('completed', checkbox.checked);
}
