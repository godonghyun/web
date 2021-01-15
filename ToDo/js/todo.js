// get element object from html 
const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = "toDos";

let toDos = []; // list of todos
let idCount = 1; // id count for providing complex

function deletToDo(event) { // delete to do
    const btn = event.target; // find button pushed
    const li = btn.parentNode; // find parent of button
    toDoList.removeChild(li); // and remove it from ul


    // for each element in toDos, make a new array with elements
    // that id is not this todo's id
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id != li.id;
    });
    toDos = cleanToDos; // override todo list
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // store in LS
}

function paintToDo(text) { // print todo
    // btn
    const delBtn = document.createElement('button');
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deletToDo);

    // text
    const span = document.createElement('span');
    span.innerText = text;

    // new li
    const li = document.createElement('li');
    const newID = idCount;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;
    toDoList.appendChild(li); // append to ul

    // js object with text and id
    const toDoObj = {
        text: text,
        id: newID
    }
    toDos.push(toDoObj);    // store in todo list

    // save in local storage
    // stringify toDos object to string
    // because local storage can only remember string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) { 
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    idCount++;

    // clear input box
    toDoInput.value = null;

    // when entered, set new class for animation
    toDoInput.classList.add('entered');
    setTimeout(function () {    // after 0.3s remove it
        toDoInput.classList.remove('entered');
    }, 300)
}

function loadToDos() {
    // load todos from LS
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) { // if exist
        // parse from json to list
        const parsedToDos = JSON.parse(loadedToDos);

        // for each element in list call printtodo
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo['text']);
            idCount++;
        });
    }
}

function init() {
    loadToDos();
    // add event lister to submit action of form
    toDoForm.addEventListener("submit", handleSubmit);
}

init();