// 바로 값을 가져오는게 아니라 id가 있는 태그랑 연결하는 듯?
let id = $('#id');
let pw = $('#pw');
let btn = $('#btn');

const user_id = 'admin';
const user_pw = '1234';

function check() {
    if ($(id).val() == "") {
        // 값이 비어있으면 새로운 warning class 추가
        $(id).next('label').addClass('warning');
        // 1500ms 뒤 label에서 warning class 제거
        setTimeout(function () {
            $('label').removeClass('warning');
        }, 1500);
    } else if ($(pw).val() == "") {
        $(pw).next('label').addClass('warning');
        setTimeout(function () {
            $('label').removeClass('warning');
        }, 1500);
    } else {
        if ($(id).val() == user_id && $(pw).val() == user_pw) {
            document.location.href = "../todolist";
        } else {
            alert('아이디 또는 비밀번호가 틀렸습니다!');
        }
    }
}

// 이벤트 리스너 추가
$(btn).on('click', check);

window.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        check();
    }
})