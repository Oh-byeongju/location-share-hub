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
            popup.alert.show("비밀번호를 입력해주세요!", function () {
                $("#pwd").focus();
            });
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
                popup.alert.show('그룹 가입에 성공하였습니다.', function () {
                    // 그룹 ID, 그룹명
                    const gId = result.groupId;
                    const gNm = result.groupNm;

                    const newListItem = $(
                        `<li class='sidebar-top-level-item' title='${gId} 그룹' 
                          data-program-id='${gId}' 
                          data-program-name='${gId}' 
                          data-program-path='/groupmap/${gId}' 
                          data-program-path-name='${gId}' 
                          data-program-rmrk='${gId}'>
                          <a class='sidebar-top-level-item-header'>
                            <div class='menuIco'>
                              <img class='menu-image' style='display:flex' src='/img/project/menuicon/ico-menu-03.png'>
                            </div>
                            <span class='nav-item-name'>
                              ${gNm} 그룹
                            </span>
                          </a>
                      </li>`
                    );
                    $(window.parent.document).find('#groupInsertTag').before(newListItem);
                });
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
