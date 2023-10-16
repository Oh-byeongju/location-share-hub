function initPage() {
    const mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(35.244791, 129.094453),
            level: 3
        };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);
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
