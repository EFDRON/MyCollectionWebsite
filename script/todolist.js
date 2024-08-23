const todoElement=document.querySelector("#todoInput");
const dateElement=document.querySelector("#dateInput");
const addButton=document.querySelector('#addButton');
const todoList=document.querySelector('#todoList');
let innerHTML='';

addButton.addEventListener('click',addTodo);


function addTodo(){
    myTodo=todoElement.value;
    date=dateElement.value;
    if(myTodo!=''){
        const theTodoElement = document.createElement('div');
    theTodoElement.classList.add('theTodoElement');

    // Create the inner HTML content
    theTodoElement.innerHTML = `
        <div>
            <input class="checkBox" type="checkbox">
            ${myTodo}
        </div>
        <div>
            ${date}
        </div>
    `;

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');

    // Append the delete button to the to-do element
    theTodoElement.appendChild(deleteButton);

    // Append the to-do element to the list
    todoList.appendChild(theTodoElement);

    // Clear the input fields
    todoElement.value = '';
    dateElement.value = '';

    // Add event listener to the delete button
    deleteButton.addEventListener('click', deleteItem);

    }
    
}


function deleteItem(event) {
console.log("Deleting...");
event.target.parentElement.remove();
}