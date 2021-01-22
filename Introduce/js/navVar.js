const el_bar = document.querySelector('.nav-bar input');
const el_frame = document.querySelector('.content-box iframe');

const initial_frame_height = el_frame.style.height;

function loadPage(page_num){
    el_frame.src = `page/page${page_num}.html`;
}

function init(){
    addScrollEvent(el_frame.contentWindow);
    
    window.addEventListener('input',function(){
        loadPage(el_bar.value);

        setTimeout(function(){
            addScrollEvent(el_frame.contentWindow);
        },500);
    });

}

init();