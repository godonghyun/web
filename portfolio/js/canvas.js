var c = document.getElementById("background-canvas");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#ffeaa7";
var animations = [];
var circles = [];
var noMoving = 0;
var currentTimeout = 0;
var pop = new Audio('pop.wav');

var colorPicker = (function () {
    var colors = ["#ffeaa7", "#fab1a0", "#74b9ff", "#55efc4"];
    var index = 0;

    function next() {
        index = index++ < colors.length - 1 ? index : 0;
        return colors[index];
    }

    function current() {
        return colors[index]
    }
    return {
        next: next,
        current: current
    }
})();

function removeAnimation(animation) {
    var index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
    var l = Math.max(x - 0, cW - x);
    var h = Math.max(y - 0, cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
    c.addEventListener("touchstart", handleEvent);
    c.addEventListener("mousedown", handleEvent);
    document.querySelector('.banner-text').addEventListener("touchstart", handleEvent);
    document.querySelector('.banner-text').addEventListener("mousedown", handleEvent);
    document.querySelector('.banner-title').addEventListener("touchstart", handleEvent);
    document.querySelector('.banner-title').addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
    if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;

    if(!e.isFaux) noMoving = 0;
    pop.play();

    var pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor
    });

    var fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: "easeOutQuart",
        complete: function () {
            bgColor = pageFill.fill;
            removeAnimation(fillAnimation);
        }
    });

    var ripple = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: currentColor,
        stroke: {
            width: 3,
            color: currentColor
        },
        opacity: 1
    });

    var rippleAnimation = anime({
        targets: ripple,
        r: rippleSize,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 900,
        complete: removeAnimation
    });

    var particles = [];
    for (var i = 0; i < 32; i++) {
        var particle = new Circle({
            x: e.pageX,
            y: e.pageY,
            fill: currentColor,
            r: anime.random(24, 48)
        })
        particles.push(particle);
    }
    var particlesAnimation = anime({
        targets: particles,
        x: function (particle) {
            return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function (particle) {
            return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(1000, 1300),
        complete: removeAnimation
    });

    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

var Circle = function (opts) {
    extend(this, opts);
}

Circle.prototype.draw = function () {
    ctx.globalAlpha = this.opacity || 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
        ctx.strokeStyle = this.stroke.color;
        ctx.lineWidth = this.stroke.width;
        ctx.stroke();
    }
    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
}

var animate = anime({
    duration: Infinity,
    update: function () {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cW, cH);
        animations.forEach(function (anim) {
            anim.animatables.forEach(function (animatable) {
                animatable.target.draw();
            });
        });
    }
});

var resizeCanvas = function () {
    cW = window.innerWidth;
    cH = window.innerHeight;
    c.width = cW * devicePixelRatio;
    c.height = cH * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    addClickListeners();

    // handleInactiveUser();
})();

function handleInactiveUser() {
    // var inactive = setTimeout(function () {
    //     fauxClick(cW / 2, cH / 2);
    // }, 2000);

    var inactive = setInterval(() => {
        noMoving++;

        if (noMoving > 2) {
            fauxClick(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
        }
    }, 2000);

    // startFauxClicking();

    // function clearInactiveTimeout() {
    //     clearTimeout(currentTimeout);
    //     document.removeEventListener("mousedown", clearInactiveTimeout);
    //     document.removeEventListener("touchstart", clearInactiveTimeout);
    // }

    // document.addEventListener("mousedown", clearInactiveTimeout);
    // document.addEventListener("touchstart", clearInactiveTimeout);
}

function startFauxClicking() {
    currentTimeout = setTimeout(function () {
        fauxClick(anime.random(cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
        startFauxClicking();
    }, anime.random(200, 900));
}

function fauxClick(x, y) {
    var fauxClick = new Event("mousedown");
    fauxClick.pageX = x;
    fauxClick.pageY = y;
    fauxClick.isFaux = true;
    document.dispatchEvent(fauxClick);
}