// jQuery와 $는 같은 표현이다
$(document).ready(function() {
    // id, pw 입력 케이스
    $("#idText, #pwText").keyup(function (key) {
        const id = $("#idText").val();
        const pw = $("#pwText").val();

        // id, pw중 하나라도 입력이 안된 경우
        if (id.length === 0 || pw.length === 0) {
            $("#loginButton").attr('disabled', true);
        }

        // id, pw 두개다 입력된 경우
        if (id.length !== 0 && pw.length !== 0) {
            $("#loginButton").attr('disabled', false);
        }

        // 엔터키 누를때 이벤트(로그인 버튼 활성화 되있는경우)
        if (key.keyCode === 13 && $("#loginButton").attr('disabled') === undefined) {
            onLogin();
        }
    });

    // 로그인 버튼 클릭 시
    $("#loginButton").click(function () {
        onLogin();
    });

    // 로그인 함수
    function onLogin() {
        // id와 pw input값 가져오기
        const id = $("#idText").val()
        const pw = $("#pwText").val()

        // id 또는 pw에 대한 예외처리
        if (id === null || id.trim() === '' || pw === null || pw.trim() === '') {
            alert("모든 정보를 입력해주세요!");
        } else {
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/login/loginRequest", // 로그인 요청 URL
                data: JSON.stringify({userId: id, userPw: pw}), // body에 넣을 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType: "json",													// 무슨형으로 데이터를 받을것인지
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success: function (data, jqXHR) {
                    // 요청이 정상적으로 되었을때 실행
                    if (jqXHR === 'nocontent') {
                        $(location).attr('href', "http://localhost:8080/main");
                    }
                },
                error: function (data) {
                    popup.alert.show("등록되지 않은 사용자입니다.");
                }
            });
        }
    }
    
    // 회원가입 화면으로 보내는 함수
    $("#joinButton").click(function () {
        $(location).attr('href', "http://localhost:8080/userjoin");
    })
});