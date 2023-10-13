var groupId = ""

function initPage() {
}

function initFrame(param) {
    groupId = param.groupId;
}

$(document).ready(function(){
    // 그룹 가입버튼 함수
    $("#submitButton").click(function () {
        const pw = $("#pwd").val();

        // pw가 빈칸인 경우
        if (pw === null || pw.trim() === '') {
            popup.alert.show('비밀번호를 입력해주세요!');
            return;
        }

        // groupId, groupPw 객체로 생성
        const param = {"groupId": groupId, groupPw: pw}

        // 가입 성공 시 왼쪽 버튼에 값 생성
        // 가입 실패 시 실패 alert
        var callback = new Callback(function(result) {
            // 성공
            if (Object.values(result).length === 2) {
                customPopup.hide();
                popup.alert.show('그룹 가입에 성공하였습니다.');

                // 그룹 ID, 그룹명
                const gId = result.groupId;
                const gNm = result.groupNm;

                const newListItem = $("<li class='sidebar-top-level-item' title='" + gId + " 그룹'" +
                    " data-program-id='" + gId + "'" +
                    " data-program-name='" + gId + "'" +
                    " data-program-path='" + gId + "'" +
                    " data-program-path-name='" + gId + "'" +
                    " data-program-rmrk='" + gId + "'>" +
                    "<a class='sidebar-top-level-item-header'>" +
                    "<div class='menuIco'>" +
                    "<img class='menu-image' style='display:flex' src='/img/project/menuicon/ico-menu-03.png'>" +
                    "</div>" +
                    "<span class='nav-item-name'>" +
                    gNm + " 그룹" +
                    "</span>" +
                    "</a>" +
                    "</li>");
                $(window.parent.document).find('.sidebar-top-level-items').prepend(newListItem);

            } else {
                customPopup.hide();
                popup.alert.show('그룹 가입에 실패하였습니다.');
            }
        });

        platform.postService("/groupinsert/groupJoin", param, callback);
    })
});

listener.button.close.click = function(data) {
    customPopup.hide(data);
}

listener.button.save.click = function () {
    var $form = $("#postForm");
    var param = $form.getData();

    if (!$form.checkValidation()) {
        return;
    }

    if (param["pwd"] !== param["pwdChk"]) {
        popup.alert.show("변경 비밀번호를 확인하세요.");
        return false;
    }
    if (!ckRegPwd(param["pwdChk"])) {
        popup.alert.show("영문, 숫자, 특수문자를 조합한\r\n패스워드를 입력해 주세요.(6 ~ 18자리 )", function (result) {
            $("#pwdChk").select();
        });
        return;
    }

    param["pwdChk"] = $.rc4EncryptStr(param["pwdChk"], KEY_ETC);
    param["pwd"] = $.rc4EncryptStr(param["pwd"], KEY_ETC);

    param["updateUserId"] = USER_INFO.USER_ID;
    param["updateUserIp"] = USER_INFO.USER_IP;

    var callback = new Callback(function (result) {
        if (result.resultCode == POST_RESULT.SUCCESS) {
            popup.alert.show("저장되었습니다", function () {
                listener.button.close.click();
            });
        } else {
            popup.alert.show("저장 중 문제가 발생되었습니다.\r\n관리자에게 문의하세요.", function () {
            });
        }
    });

    platform.postService("/myInfo/save", param, callback);
}
