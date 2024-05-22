// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
Date;
// this is for the different status for tasks
const tStatus = {
  todo: "to-do",
  prog: "in-progress",
  done: "done",
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
    class: "",
    id: task.id,
    status: task.status,
  };
  // Add styling to
  let card = generateElement("div", cardData);
  // with dayjs i can get the change in time from dueDate to present deltaTima will show it in days
  const now = dayjs(new Date());
  const dueDate = dayjs(task.dueDate);
  const deltaTime = dueDate.diff(now, "day");
  // inline conditionsal if deltaTime > 3 set the background to bg sucess
  // else if deltaTime > 0 set background to bg-warning
  // else set background to bg-danger
  card.addClass(
    deltaTime > 3
      ? "bg-success"
      : deltaTime < 3 && deltaTime > 0
      ? "bg-warning"
      : "bg-danger"
  );
  card.addClass("task-card");
  card.css("z-index", 1);
  // useing toolBox functions create child elements for the card
  // be sure to store those bad puppies in a array for children
  let children = [
    generateSimpleTag("h2", task.title),
    generateSimpleTag(
      "h4",
      `Due: ${new Date(task.dueDate).toLocaleDateString()}`
    ),
    generateElement("p", { id: "description" }).append(task.description),
    generateElement("button", { class: "btn btn-danger border border-dark" })
      .text("DELETE")
      .on("click", handleDeletTask),
  ];
  // attach the child elements in children to the card and return the card
  card.append(children);
  card.css("margin-bottom:", "1em");
  return card;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  let task = getItem("tasks");
  if (!tasks || tasks.length == 0) {
    return;
  }
  // get the card section to append
  // card will be appended to card section based on statyus
  // set the height of card section according to status
  // remove any ninos cars to prp for render
  const style = { "min-height": "170px", height: "100%" };
  const todo = $("#todo-cards").css(style).empty().sortable().sortable();
  const inProgress = $("#in-progress-cards").css(style).empty().sortable();
  const done = $("#done-cards").css(style).empty().sortable().sortable();

  task.forEach((task) => {
    let card = createTaskCard(task);
    card.draggable({
      containment: "#taskboard",
      revert: "invalid",
      snap: true,
      snpaMode: "inner",
    });
    // this switch case handles wich csared task card attaches to
    switch (task.status) {
      case tStatus.todo:
        todo.append(card);
        break;
      case tStatus.prog:
        inProgress.append(card);
        break;
      case tStatus.done:
        done.append(card);
        break;
      default:
        break;
    }
  });
  // this will handle dropped a dragable onto droppable abd calls handleDROP TO reassighn task status & store task update
  todo.droppable({
    drop: function (ev, ui) {
      handleDrop(ev, ui);
      $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
    },
  });
  inProgress.droppable({
    drop: function (ev, ui) {
      handleDrop(ev, ui);
      $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
    },
  });
  done.droppable({
    drop: function (ev, ui) {
      handleDrop(ev, ui);
      $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
    },
  });

  // Todo: create a function to handle adding a new task
  function handleAddTask(event) {
    // prevent modal from dismisshing
    event.preventDefault();
    // object to store task data
    let task = {
      // title duedateand description get values from useerr inputs
      title: $("#task-title").val(),
      dueDate: new Date(
        new Date($("#task-due-date").val()).getTime() + 24 * 60 * 60 * 1000
      ),
      description: $("#task-decscription").val(),
      // generate id by calling generatTaskId
      id: generateTaskId(),
      // every new task will have its status set to to-do by default
      status: tStatus.todo,
    };
    if (task.title == "" || !task.title) {
      return;
    }
    console.log(`new task: `);
    console.log(task);
    // use our toolBox function to store our task without thinknig about it
    storeTask(task);
    renderTaskList();
    $("#taskModal").modal("hide");
  }
  function storeTask(task) {
    // use tool box fucntion to store task
    let tasks = getItem("tasks");
    // clear wrong tasek and make new array
    if (!tasks || typeof tasks == !Array) {
      tasks = [];
    }
    tasks.push(task);
    // use toolboc function getitem to get taskwithout haveing to worry aboy parsing data
    setItem("tasks", tasks);
  }

  // Todo: create a function to handle deleting a task
  function handleDeleteTask(event) {
    let card = this.parentElement;
    let tasks = getItem("tasks");
    // this will traverse through the array and remove the task
    tasks.forEach((task) => {
      if (task.id == card.id) {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
      }
    });
    // this will store our updated tasks
    setItem("tasks", tasks);
    // this should remove the task card from the DOM
    card.remove();
  }
  // Todo: create a function to handle dropping a task into a new status lane
  function handleDrop(event, ui) {
    // modify dragged task
    let dragged = $(ui.draggable)[0];
    let tasks = getItem("tasks");
    // matching task with id and setting status to dropped card
    let task = tasks.find((entry) => entry.id === dragged.id);
    if (event.target.id == "in-progress-cards") {
      dragged.setAttribute("status", tStatus.prog);
      task.status = tStatus.prog;
    } else if (event.target.id == "done-cards") {
      dragged.setAttribute("status", tStatus.done);
      task.status = tStatus.done;
    } else {
      dragged.setAttribute("status", tStatus.todo);
      task.status = tStatus.todo;
    }
    // replace the old task with the new task
    tasks.splice(tasks.indexOf(task), 1, task);
    // stor the updated tasks array
    setItem("tasks", tasks);
  }

  // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
  $(document).ready(function () {
    // add a click listner to add task btn
    $("#add-task-btn").on("click", handleAddTask);
    renderTaskList();
  });
}
