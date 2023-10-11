// jQuery와 $는 같은 표현이다
$(document).ready(function() {
    // 아이디 중복확인 이벤트
    $("#idCheckButton").click(function () {
        // id input값 가져오기
        const idInput = $("#idText").val();

        // id 빈칸 예외처리
        if (idInput === null || idInput.trim() === '') {
            alert("아이디를 입력해주세요!");
        } else {
            $.ajax({
                type : "GET",
                async: true,
                url : "http://localhost:8080/userjoin/idCheck", // 아이디 중복확인 URL
                data : {id: idInput}, // RequestParam 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                success : function(data, jqXHR) {
                    alert("사용 가능한 아이디입니다.");
                    $("#idText").attr('disabled', true);
                    $("#idCheckButton").attr('disabled', true);
                },
                error : function(data) {
                    alert("이미 사용중인 아이디입니다.");
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
            alert("이메일을 입력해주세요!");
        } else {
            $.ajax({
                type : "GET",
                async: true,
                url : "http://localhost:8080/userjoin/emailCheck", // 이메일 중복확인 URL
                data : {email: emailInput}, // RequestParam 값
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType : "json",													// 무슨형으로 데이터를 받을것인지
                success : function(data, jqXHR) {
                    alert("사용 가능한 이메일입니다.");
                    $("#emailText").attr('disabled', true);
                    $("#emailCheckButton").attr('disabled', true);
                },
                error : function(data) {
                    alert("이미 사용중인 이메일입니다.");
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

        // 입력 빈칸 예외처리
        if (idInput === null || idInput.trim() === '' || pwInput === null || pwInput.trim() === '' ||
            pwConfirmInput === null || pwConfirmInput.trim() === '' || nameInput === null || nameInput.trim() === '' ||
            emailInput === null || emailInput.trim() === '') {
            alert("모든 정보를 입력해주세요!");
        }
        // 비밀번호 확인 예외처리
        else if (pwInput !== pwConfirmInput) {
            alert("동일한 비밀번호를 입력해주세요!")
        }
        // 아이디 중복확인 안된 케이스 예외처리
        else if ($("#idCheckButton").attr('disabled') === undefined) {
            alert("아이디 중복확인을 해주세요!");
        }
        // 이메일 중복확인 안된 케이스 예외처리
        else if ($("#emailCheckButton").attr('disabled') === undefined) {
            alert("이메일 중복확인을 해주세요!");
        }




        // // email 빈칸 예외처리
        // if (emailInput === null || emailInput.trim() === '') {
        //     alert("이메일을 입력해주세요!");
        // } else {
        //     $.ajax({
        //         type : "GET",
        //         async: true,
        //         url : "http://localhost:8080/userjoin/emailCheck", // 이메일 중복확인 URL
        //         data : {email: emailInput}, // RequestParam 값
        //         contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
        //         dataType : "json",													// 무슨형으로 데이터를 받을것인지
        //         success : function(data, jqXHR) {
        //             alert('사용 가능한 이메일입니다.');
        //             $("#emailText").attr('disabled', true);
        //             $("#emailCheckButton").attr('disabled', true);
        //         },
        //         error : function(data) {
        //             alert('이미 사용중인 이메일입니다.');
        //         }
        //     });
        // }
    });

});