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
            // 여기 가입자수를 채워야함
            {id: "dssd", editor: "text", sort:"string", header: "가입자 수", css: "textLeft", fillspace:true},
            {id: "insertDt", editor: "text", sort:"string", header: "그룹 등록일", css: "textLeft", fillspace:true},

        ]
    });

    $$("grid1").attachEvent("onBeforeEditStart", function(id){
        var record = $$("grid1").getItem(id.row);
        if( id.column == "pgmId" && checkEmpty(record["gstat"],"U") == "U" ){
            return false;
        }
    });

    $$("grid1").attachEvent("onAfterEditStop", function(state, editor, ignoreUpdate){
        if( checkEmpty(state.value,"") != checkEmpty(state.old,"")) {
            var record = $$("grid1").getItem(editor.row);
            record["gstat"] = (record["gstat"] == "I")?"I":"U";
        }
    });
    $$("grid1").attachEvent("onCheck", function(rowId, colId, state){
        var record = $$("grid1").getItem(rowId);
        record["gstat"] = (record["gstat"] == "I")?"I":"U";
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

    var callback = new Callback(function(result) {});
    // 가입 팝업창 여는 함수
    // 파라미터로 groupId 던져줌
    customPopup.show("/groupinsert/popup", "그룹 가입", 400, 190, callback, {groupId: grid.getSelectedItem().groupId});
}






















//삭제버튼
listener.button.del.click = function () {
    var grid = $$("grid1");

    var param = new Object();
    var delList = new Array();

    grid.eachRow(function(row,b,c,d) {
        var record = grid.getItem(row);

        if (record["ch1"] == "Y") {
            delList.push(record);
        }
    });

    if (delList.length == 0) {
        popup.alert.show("삭제할 데이터를 선택해주세요.", null);
        return;
    }

    popup.confirm.show("삭제 하시겠습니까?", function(result) {
        if (result) {
            var callback = new Callback(function(result) {
                if(result.resultCode == POST_RESULT.SUCCESS){
                    popup.alert.show("삭제되었습니다", function() {
                        listener.button.search.click();
                    });
                }else{
                    popup.alert.show("삭제 중 문제가 발생되었습니다.\r\n관리자에게 문의하세요.", function() {
                    });
                }
            });
            param["queryid"] = "sy201.deleteByPrimaryKey";
            param["data"] = delList;
            platform.postService("/common/deleteList", param, callback);
        }
    });
}

//행추가
listener.button.addRow.click = function(event) {
    var evt = event || window.event;
    var $el = $(evt.currentTarget);
    var gridId = $el.data("target");

    //추가 행 기본값 세팅
    $$(gridId).addRow({pgmId:"", pgmNm:"", pgmDesc:"", path:"", useYn:"Y", bigo:"", oldPgmId:"", gstat:"I"});
}

//행삭제
listener.button.removeRow.click = function(event) {
    var evt = event || window.event;
    var $el = $(evt.currentTarget);

    var gridId = $el.data("target");
    $$(gridId).removeSelectedRow();
}
