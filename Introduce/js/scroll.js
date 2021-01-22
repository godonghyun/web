const el_nav_box = document.querySelector('.nav-box');
const el_nav_bar = el_nav_box.querySelector('.nav-bar');
const el_top_blur = document.querySelector('.top-blur');
const el_bottom_blur = document.querySelector('.bottom-blur');

function addScrollEvent(iframe_window){  
    iframe_window.addEventListener('scroll',function(){
        let y_offset = iframe_window.scrollY;

        if(y_offset < 10){
            el_nav_box.classList.remove('hide');
            el_nav_bar.classList.remove('hide');
            el_top_blur.classList.remove('show');
            el_bottom_blur.classList.remove('show');
            el_frame.classList.remove('show');

        }else{
            el_nav_box.classList.add('hide');
            el_nav_bar.classList.add('hide');
            el_top_blur.classList.add('show');
            el_bottom_blur.classList.add('show');
            el_frame.classList.add('show');
        }
    });
}

function init(){
   
}