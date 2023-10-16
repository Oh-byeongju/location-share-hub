// jQuery와 $는 같은 표현이다
$(document).ready(function() {
    // 아이디 중복확인 이벤트
    $("#idCheckButton").click(function () {
        // id input값 가져오기
        const idInput = $("#idText").val();

        // id 빈칸 예외처리
        if (idInput === null || idInput.trim() === '') {
            popup.alert.show("아이디를 입력해주세요!", function () {
                $("#idText").focus();
            });
        } else {
            $.ajax({
                type : "GET",
                async: true,
                url : "http://localhost:8080/userjoin/idCheck", // 아이디 중복확인 URL
                data : {id: idInput}, // RequestParam 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                success : function(data, jqXHR) {
                    popup.alert.show("사용 가능한 아이디입니다.", function () {
                        $("#idText").attr('disabled', true);
                        $("#idCheckButton").attr('disabled', true);
                    });
                },
                error : function(data) {
                    popup.alert.show("이미 사용중인 아이디입니다.");
                }
            });
        }
    });

    // 이메일 중복확인 이벤트
    $("#emailCheckButton").click(function () {
        // email input값 가져오기
        const emailInput = $("#emailText").val();

        // email 빈칸 예외처리
        if (emailInput === null || emailInput.trim() === '') {
            popup.alert.show("이메일을 입력해주세요!", function () {
                $("#emailText").focus();
            });
        } else {
            $.ajax({
                type : "GET",
                async: true,
                url : "http://localhost:8080/userjoin/emailCheck", // 이메일 중복확인 URL
                data : {email: emailInput}, // RequestParam 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                success : function(data, jqXHR) {
                    popup.alert.show("사용 가능한 이메일입니다.", function() {
                        $("#emailText").attr('disabled', true);
                        $("#emailCheckButton").attr('disabled', true);
                    });
                },
                error : function(data) {
                    popup.alert.show("이미 사용중인 이메일입니다.");
                }
            });
        }
    });

    // 회원가입 이벤트
    $("#joinButton").click(function () {
        // 모든 input값 가져오기
        const idInput = $("#idText").val();
        const pwInput = $("#pwText").val();
        const pwConfirmInput = $("#pwConfirmText").val();
        const nameInput = $("#nameText").val();
        const emailInput = $("#emailText").val();

        // 아이디 빈칸 예외처리
        if (idInput === null || idInput.trim() === '') {
            popup.alert.show("아이디를 입력해주세요!", function () {
                $("#idText").focus();
            });
        }
        // 비밀번호 빈칸 예외처리
        else if (pwInput === null || pwInput.trim() === '') {
            popup.alert.show("비밀번호를 입력해주세요!", function () {
                $("#pwText").focus();
            });
        }
        // 비밀번호 확인 빈칸 예외처리
        else if (pwConfirmInput === null || pwConfirmInput.trim() === '') {
            popup.alert.show("비밀번호 확인을 입력해주세요!", function () {
                $("#pwConfirmText").focus();
            });
        }
        // 이름 빈칸 예외처리
        else if (nameInput === null || nameInput.trim() === '') {
            popup.alert.show("이름을 입력해주세요!", function () {
                $("#nameText").focus();
            });
        }
        // 이메일 빈칸 예외처리
        else if (emailInput === null || emailInput.trim() === '') {
            popup.alert.show("이메일을 입력해주세요!", function () {
                $("#emailText").focus();
            });
        }
        // 비밀번호 확인 예외처리
        else if (pwInput !== pwConfirmInput) {
            popup.alert.show("동일한 비밀번호를 입력해주세요!", function () {
                $("#pwConfirmText").focus();
            })
        }
        // 아이디 중복확인 안된 케이스 예외처리
        else if ($("#idCheckButton").attr('disabled') === undefined) {
            popup.alert.show("아이디 중복확인을 해주세요!");
        }
        // 이메일 중복확인 안된 케이스 예외처리
        else if ($("#emailCheckButton").attr('disabled') === undefined) {
            popup.alert.show("이메일 중복확인을 해주세요!");
        }
        else {
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/userjoin/joinRequest", // 회원가입 요청 URL
                data: JSON.stringify({
                    id: idInput,
                    pw: pwInput,
                    pwConfirm: pwConfirmInput,
                    name: nameInput,
                    email: emailInput
                }), // body에 넣을 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType: "json",													// 무슨형으로 데이터를 받을것인지
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success: function (data, jqXHR) {
                    // 요청이 정상적으로 되었을때 실행
                    if (jqXHR === 'nocontent') {
                        popup.alert.show("회원가입에 성공했습니다.", function() {
                            $(location).attr('href', "http://localhost:8080/login");
                        });
                    }
                },
                error: function (data) {
                    popup.alert.show('회원가입에 실패하였습니다. (오류 발생)', function () {
                        $(location).attr('href', "http://localhost:8080/userjoin");
                    });
                }
            });
        }
    });
});