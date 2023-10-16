function initPage() {
    listener.button.search.click();
}

webix.ready(function() {
    webix.ui({
        id : "grid1",
        container : "grid1",
        view : "datagrid",
        columns : [
            {id: "groupId", sort:"string", header: "그룹 ID", css: "textLeft", width : 150},
            {id: "groupNm", sort:"string", header: "그룹명", css:"textLeft", width: 230},
            {id: "userId", sort:"string", header: "그룹장", css: "textLeft"},
            {id: "userEmail", sort:"string", header: "그룹장 이메일", css: "textLeft", fillspace:true},
            {id: "groupCount", sort:"int", header: "가입자 수", css: "textright", fillspace:true},
            {id: "insertDt", sort:"string", header: "그룹 등록일", css: "textLeft", fillspace:true},

        ]
    });

    $$("grid1").attachEvent("onAfterLoad", function(id){
        if (this.count() === 0) {
            this.showOverlay("그룹 정보가 없습니다."); // No Content View 표시
        } else {
            this.hideOverlay(); // 오버레이 숨기기
        }
    });
});

listener.select.change = function($el) {
}

listener.editor.keydown = function($el) {
}

// 조회버튼
listener.button.search.click = function () {
    const param = $("#searchArea").getData();

    // 그리드초기화
    $$("grid1").clearData();

    // 그리드에 값 세팅
    var callback = new Callback(function(result) {
        $$("grid1").setData(result);
    });

    platform.postService("/groupinsert/groupSearch", param, callback);
}

// 가입버튼
listener.button.join.click = function () {
    var grid = $$("grid1");

    if (grid.getSelectedItem() === undefined) {
        popup.alert.show('그룹을 선택해주세요.');
        return;
    }

    var callback = new Callback(function(result) {listener.button.search.click();});
    // 가입 팝업창 여는 함수
    // 파라미터로 groupId 던져줌
    // 가입창 닫을때마다 그룹 정보 갱신
    customPopup.show("/groupinsert/groupJoinPopup", "그룹 가입", 400, 190, callback, {groupId: grid.getSelectedItem().groupId});
}

// 생성버튼
listener.button.create.click = function () {
    var callback = new Callback(function(result) {listener.button.search.click();});

    // 생성 팝업창 여는 함수
    // 파라미터는 사용 안함
    // 생성창 닫을때마다 그룹 정보 갱신
    customPopup.show("/groupinsert/groupCreatePopup", "그룹 생성", 780, 720, callback, {groupId: "temp"});
}