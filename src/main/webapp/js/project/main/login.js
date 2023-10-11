// jQuery와 $는 같은 표현이다
$(document).ready(function() {
    //ready 시점에 현 페이지의 이벤트를 등록한다.
    $("#loginButton").click(function () {
        // id와 pw input값 가져오기
        var id = $("#id_text").val()
        var pw = $("#pw_text").val()

        // id 또는 pw에 대한 예외처리
        if (id === null || id.trim() === '' || pw === null || pw.trim() === '') {
            alert("모든 정보를 입력해주세요!");
        } else {
            $.ajax({
                type : "POST",
                async: true,
                url : "http://localhost:8080/login/Request", // 로그인 요청 URL
                data : JSON.stringify({ userId: id, userPw: pw}), // body에 넣을 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success : function(data, jqXHR) {
                    // 요청이 정상적으로 되었을때 실행
                    if (jqXHR === 'nocontent') {
                        $(location).attr('href', "http://localhost:8080/main");
                    }
                },
                error : function(data) {
                    alert('등록되지 않은 사용자입니다.');
                }
            });
        }
    })
    
    // 회원가입 화면으로 보내는 함수
    $("#joinButton").click(function () {
        $(location).attr('href', "http://localhost:8080/userjoin");
    })
});