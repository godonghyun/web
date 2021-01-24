const target = document.querySelector('.dynamic');
const banner_text = ["Responsive Web Design", "Learn to code Website", "Life is short we need Python", "I need Background Images"];

function removePreload(){
    document.querySelector('.preload').classList.remove('preload');
}

function blink() {
    target.classList.toggle('active');
}

function resetText() {
    target.innerHTML = "";
}

function randomTextChars() {
    let selected_text = banner_text[Math.floor(Math.random() * banner_text.length)];
    console.log(selected_text);
    let selected_text_chars = selected_text.split('');

    return selected_text_chars;
}

function dynamic(text) {
    if (text.length > 0) {
        target.innerHTML += text.shift();
        setTimeout(function () {
            dynamic(text)
        }, 80);
    } else {
        setTimeout(function () {
            resetText();
        }, 3000);
    }
}

function init() {
    window.onload = () => {
        removePreload();
    }

    setInterval(function () {
        if (target.innerHTML == "") {
            dynamic(randomTextChars());
        }
        blink();
    }, 500);
}

init();