function initPage() {
}

function initFrame() {
}

$(document).ready(function() {
    // 회원정보 수정 함수
    $("#submitButton").click(function () {
        // 모든 input값 가져오기
        const pwInput = $("#pwText").val();
        const pwConfirmInput = $("#pwConfirmText").val();
        const nameInput = $("#nameText").val();

        // 비밀번호 빈칸 예외처리
        if (pwInput === null || pwInput.trim() === '') {
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
        // 비밀번호 확인 예외처리
        else if (pwInput !== pwConfirmInput) {
            popup.alert.show("동일한 비밀번호를 입력해주세요!", function () {
                $("#pwConfirmText").focus();
            })
        }
        else {
            $.ajax({
                type: "POST",
                async: true,
                url: "http://localhost:8080/main/userInfoModify",
                data: JSON.stringify({
                    userPw: pwInput,
                    userNm: nameInput
                }),
                contentType: "application/json",									// 무슨형의 데이터를 보낼것인지
                dataType: "json",													// 무슨형으로 데이터를 받을것인지
                withCredentials: true,          // 세션 쿠키 날리는 설정
                success: function (data, jqXHR) {
                    // 요청이 정상적으로 되었을때 실행
                    if (jqXHR === 'nocontent') {
                        popup.alert.show("회원정보 수정에 성공했습니다.", function() {
                            parent.refreshParent();
                        });
                    }
                },
                error: function (data) {
                    popup.alert.show('회원정보 수정에 실패했습니다. (오류 발생)');
                }
            });
        }
    });
});