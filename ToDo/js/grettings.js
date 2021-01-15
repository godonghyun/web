// get element object from html 
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", // name of local storage variable for username
    SHOWING_CN = "showing"; // when add this showing to class, it shows in screen

function saveName(text) { // save name in local storage
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) { // handle submit of user name
    event.preventDefault(); // no default actions for submit event

    const currentValue = input.value; // get value in input text box

    input.classList.add('entered'); // name entered
    setTimeout(function () {    // animation class will be removed after 0.3s
        input.classList.remove('entered');
    }, 300)

    setTimeout(function () {    // show greeting after enter animation
        paintGreeting(currentValue); // show greeting
    }, 600)

    saveName(currentValue); // save in local storage
}

function askForName() { // ask for user name
    form.classList.add(SHOWING_CN); // show input text box
    form.addEventListener("submit", handleSubmit); // add new submit event lister
}

function paintGreeting(text) { // paint greeting instead of input box
    form.classList.remove(SHOWING_CN); // do not show input box
    greeting.classList.add(SHOWING_CN); // show greeting h4 tag
    greeting.innerText = `안녕하세요 ${text}님`; // set text
}

function loadName() { // load name of user
    const currentUser = localStorage.getItem(USER_LS); // get username in LS
    if (currentUser === null) { // he is not known
        askForName();
    } else { // he is   known
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();