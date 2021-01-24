const body = document.querySelector('body');
const content = document.querySelector('.content');

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    // load image and append to body
    // add bgImage class for css
    const img = new Image();
    img.src = `images/${imgNumber}.jpg`;
    img.classList.add("bgImage");
    content.appendChild(img);
}

function genRandom() { // get random number between 0~IMG_NUMBER-1
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();