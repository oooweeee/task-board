// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
Date
// this is for the different status for tasks 
const tStatus ={
    todo: 'to-do', 
    prog:'in-progress',
    done:'done',
};
//  make a button clickable 
// create a modal to fill out for 3 categoies
// make add task button clickable for submitting modal after filling it out 
// needs to go in the column how does it go in to the column
// create an html element and then append it to the page
// create dragable function or call
// now make it deletable



// Todo: create a function to generate a unique task id
function generateTaskId() {
    return keyGenerator(new Date());

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let cardData = {
        class: '',
        id: task.id,
        status: task.status,
    }

}
// Add styling to 
let card =generateElement("div",cardData);
// with dayjs i can get the change in time from dueDate to present deltaTima will show it in days
const now = dayjs(new Date);
const dueDate = dayjs(task.dueDate);
const deltaTime = dueDate.diff(now, 'day');
// inline conditionsal if deltaTime > 3 set the background to bg sucess
// else if deltaTime > 0 set background to bg-warning
// else set background to bg-danger
card.addClass(deltaTime> 3 ? "bg-success" : deltaTime < 3 && deltaTime > 0 ? "bg-warning" : "bg-danger");
card.addClass("task-card")
card.css('z-index', 1);
// useing toolBox functions create child elements for the card
// be sure to store those bad puppies in a array for children 
let childeren = [
    generateSimpleTag("h2", task.title),
    generateSimpleTag('h4',`Due: ${new Date(task.dueDate).toLocaleDateString()}`),
    generateElement("p",{id:'description' }).append(task.description),
    generateElement ("button",{class: "btn btn-danger border border-dark" }).text('DELETE').on('click', handleDeletTask),
];
// attach the child elements in children to the card and return the card
card.append(children);
card.css('margin-bottom:', '1em');
return card;
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
