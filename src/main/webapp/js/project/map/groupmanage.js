var sortId = null;
var sortDir = null;

function initPage() {
    listener.button.search.click();
}

webix.ready(function() {
    webix.ui({
        id : "grid1",
        container : "grid1",
        view : "datagrid",
        columns : [
            {id: "groupId", header: "그룹 ID", css: "textLeft", width : 150, fillspace:true},
            {id: "groupNm", sort:"string", header: "그룹명", css:"textLeft", width: 230, fillspace:true},
            {id: "userId", header: "그룹장", css: "textLeft", width: 200, fillspace:true},
            {id: "userEmail", header: "그룹장 이메일", css: "textLeft", width: 170, fillspace:true},
            {
                id: "groupCount",
                sort: "int",
                header: "가입자 수",
                css: "textCenter",
                width: 100,
                fillspace: true,
                template: function (obj) {
                    return obj.groupCount + "명";
                }
            },
            {id: "insertDt", sort:"string", header: "그룹 등록일", css: "textCenter", width: 100, fillspace:true},
        ]
    });

    $$("grid1").attachEvent("onAfterLoad", function(id){
        if (this.count() === 0) {
            this.showOverlay("그룹 정보가 없습니다."); // No Content View 표시
        } else {
            this.hideOverlay(); // 오버레이 숨기기
        }
    });

    // 정렬에 따른 event
    $$("grid1").attachEvent("onAfterSort", function (id, order) {
        sortId = id;
        sortDir = order;

        // 정렬 3번 눌러서 초기화 되는 경우
        // 정렬 순서도 초기화
        if (id === 'id') {
            sortId = null;
            sortDir = null;
        }
    });

    $$("grid1").attachEvent("onItemClick", function(id) {
        var record = $$("grid1").getItem(id.row);
        /// 여기서 그룹원 조회 이벤트 드가면 됨
        //alert (record.groupId)
    });

    webix.ui({
        id : "grid2",
        container : "grid2",
        view : "datagrid",
        columns : [
            {id: "groupUserId", header: "그룹원 ID", css: "textLeft", width : 150, fillspace:true},
            {id: "groupUserNm", sort:"string", header: "이름", css:"textLeft", width: 230, fillspace:true},
            {id: "groupUserRank", header: "등급", css: "textLeft", width: 200, fillspace:true},
            {id: "groupUserEmail", header: "그룹원 이메일", css: "textLeft", width: 170, fillspace:true},
            {id: "groupUserInstDt", sort:"string", header: "그룹 가입일", css: "textCenter", width: 100, fillspace:true}
        ]
    });

    $$("grid2").attachEvent("onAfterLoad", function(id){
        if (this.count() === 0) {
            this.showOverlay("그룹원 정보가 없습니다."); // No Content View 표시
        } else {
            this.hideOverlay(); // 오버레이 숨기기
        }
    });

    // 정렬에 따른 event
    $$("grid2").attachEvent("onAfterSort", function (id, order) {
        sortId = id;
        sortDir = order;

        // 정렬 3번 눌러서 초기화 되는 경우
        // 정렬 순서도 초기화
        if (id === 'id') {
            sortId = null;
            sortDir = null;
        }
    });
});

// 조회버튼
listener.button.search.click = function () {
    const param = $("#searchArea").getData();

    // 그리드초기화
    $$("grid1").clearData();
    $$("grid2").clearData();

    // 그리드에 값 세팅
    var callback = new Callback(function(result) {
        $$("grid1").setData(result);
        // 정렬된 기록이 있으면 정렬
        if (sortId !== null && sortDir !== null) {
            $$("grid1").sort(sortId, sortDir);
        }
    });

    platform.postService("/groupmanage/groupSearch", param, callback);
}

// // 가입버튼
// listener.button.join.click = function () {
//     var grid = $$("grid1");
//
//     if (grid.getSelectedItem() === undefined) {
//         popup.alert.show('그룹을 선택해주세요.');
//         return;
//     }
//
//     var callback = new Callback(function(result) {listener.button.search.click();});
//     // 가입 팝업창 여는 함수
//     // 파라미터로 groupId 던져줌
//     // 가입창 닫을때마다 그룹 정보 갱신
//     customPopup.show("/groupinsert/groupJoinPopup", "그룹 가입", 400, 190, callback, {groupId: grid.getSelectedItem().groupId});
// }
//
// // 생성버튼
// listener.button.create.click = function () {
//     var callback = new Callback(function(result) {listener.button.search.click();});
//
//     // 생성 팝업창 여는 함수
//     // 파라미터는 사용 안함
//     // 생성창 닫을때마다 그룹 정보 갱신
//     customPopup.show("/groupinsert/groupCreatePopup", "그룹 생성", 780, 725, callback, {groupId: "temp"});
// }