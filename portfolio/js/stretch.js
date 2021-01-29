const el_content_balls = document.querySelectorAll('.content-ball');
const el_close_balls = document.querySelectorAll('.ball-close');

function stretchBall(ball) {
    ball.classList.add('stretch');
    ball.disabled = true;
}

function shrinkBall(ball) {
    const stretched_ball = Array.from(el_content_balls).find(item_ball => {
        return ball.value == item_ball.value;
    })

    stretched_ball.classList.remove('stretch');
    setTimeout(function () {
        stretched_ball.disabled = false;
    }, 1000);
}

function init() {
    el_content_balls.forEach(ball => {
        ball.addEventListener('click', function () {
            stretchBall(ball);
        });
    });

    el_close_balls.forEach(ball => {
        ball.addEventListener('click', function () {
            shrinkBall(ball);
        });
    })
}

init();