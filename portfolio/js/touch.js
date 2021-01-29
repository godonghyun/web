function createTouch() {
    var e = new Event('touchstart');


    document.dispatchEvent(e);
}

function init() {
    setInterval(function(){
        // createTouch();
        // console.log("touched");
    }, 1000);
}

init();