const el_content_balls = document.querySelectorAll('.content-ball');


function stretchBall(ball) {
    ball.classList.add('stretch');
    ball.disabled = true;
}

function shrinkBall(ball) {
    ball.classList.remove('stretch');
    setTimeout(function () {
        ball.disabled = false;
    }, 1000);
}

function ballClicked(ball) {
    stretchBall(ball);
    setTimeout(function () {
        shrinkBall(ball);
    }, 2000);
    console.log(ball.value);
}

function init() {
    el_content_balls.forEach(ball => {
        ball.addEventListener('click', function () {
            ballClicked(ball);
        });
    });
}

init();