var sortId = null;
var sortDir = null;
var sortId2 = null;
var sortDir2 = null;

function initPage() {
    listener.button.search.click();

    // 그룹원 저장 버튼 이벤트
    $("#userSave").on("click", function(){
        const table = $$("grid2"); // datatable ID
        const allData = table.serialize(); // 전체 데이터

        // 체크박스가 체크된 행만 필터링
        const dirtyRows = allData.filter(row => row._dirty === 1);

        if (dirtyRows.length === 0) {
            popup.alert.show('그룹원을 선택해주세요.');
            return;
        }

        popup.confirm.show("그룹원을 수정하시겠습니까?", function(bool) {
            if (bool) {
                try {
                    var callback = new Callback(function(result) {
                        if (result === '성공') {
                            popup.alert.show('그룹원 수정에 성공하였습니다.', function () {
                                var param = $$("grid1").getSelectedItem()

                                // 그리드초기화
                                $$("grid2").clearData();

                                // 그리드에 값 세팅
                                var callback = new Callback(function(result) {
                                    $$("grid2").setData(result);
                                    // 정렬된 기록이 있으면 정렬
                                    if (sortId2 !== null && sortDir2 !== null) {
                                        $$("grid2").sort(sortId2, sortDir2);
                                    }
                                });

                                platform.postService("/groupmanage/group-user-search", param, callback);
                            });
                        } else {
                            popup.alert.show("그룹원 수정에 실패하였습니다.", function () {
                                // main 페이지를 새로고침
                                parent.refreshParent();
                            });
                        }
                    });
                    platform.postService("/groupmanage/group-user-update", dirtyRows, callback);
                } catch (e) {}
            }
        });
    });
}

webix.ready(function() {
    webix.ui({
        id : "grid1",
        container : "grid1",
        view : "datagrid",
        columns : [
            {id: "groupId", header: "그룹 ID", css: "textLeft", width : 120},
            {id: "groupNm", sort:"string", header: "그룹명", css:"textLeft", width: 230, fillspace:true},
            {id: "userId", header: "그룹장", css: "textLeft", width: 90},
            {id: "userEmail", header: "그룹장 이메일", css: "textLeft", width: 170, fillspace:true},
            {
                id: "groupCount",
                sort: "int",
                header: "가입자 수",
                css: "textCenter",
                width: 100,
                template: function (obj) {
                    return obj.groupCount + "명";
                }
            },
            {id: "insertDt", sort:"string", header: "그룹 등록일", css: "textCenter", width: 100},
            {id: "groupLev", header: "그룹 크기", hidden: true},
            {id: "groupLat", header: "그룹 위도", hidden: true},
            {id: "groupLong", header: "그룹 경도", hidden: true}
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
        const record = $$("grid1").getItem(id.row);

        // 그리드초기화
        $$("grid2").clearData();

        // 그리드에 값 세팅
        var callback = new Callback(function(result) {
            $$("grid2").setData(result);
            // 정렬된 기록이 있으면 정렬
            if (sortId2 !== null && sortDir2 !== null) {
                $$("grid2").sort(sortId2, sortDir2);
            }
        });

        platform.postService("/groupmanage/group-user-search", record, callback);
    });

    const RANK_OPTIONS = [
        { id: "special", value: "특별" },
        { id: "normal", value: "일반" },
        { id: "blocked", value: "차단" }
    ];
    const rankOptions = new webix.DataCollection({ data: RANK_OPTIONS });

    webix.ui({
        id : "grid2",
        container : "grid2",
        view : "datagrid",
        editable: true,
        css: "webix_header_border webix_data_border",
        multiselect:true,
        select:"row",
        columns : [
            {id: "groupUserNo", header: "그룹가입번호", hidden: true},
            {id: "_dirty", header: " ", width: 30, css: "textCenter", template: "{common.checkbox()}", editor: "checkbox", checkValue: 1, uncheckValue: 0 },
            {id: "userId", header: "그룹원 ID", css: "textLeft", width : 90},
            {id: "userNm", sort:"string", header: "이름", css:"textLeft", width: 230, fillspace:true},
            {
                id: "groupUserRankCd",
                header: "등급",
                css: "textCenter",
                width: 90,
                editor: "richselect",
                options: rankOptions,          // 위의 옵션 재사용
                template: function (obj, common, value) {
                    const item = rankOptions.getItem(value);
                    const label = item ? item.value : (value || "");

                    if (value === 'leader') {
                        return (
                            "<div class='rank-display' " +
                            "style='pointer-events:none; opacity:0.5; cursor:default;'>" +
                            "<span class='rank-label'>" + '그룹장' + "</span>" +
                            "<img class='rank-icon' " +
                            "style='padding-left:8px; padding-bottom:1px;' " +
                            "src='/img/mngr/drop_down.png' alt='▼'/>" +
                            "</div>"
                        );
                    } else {
                        return (
                            "<div class='rank-display'>" +
                            "<span class='rank-label'>" + webix.template.escape(label) + "</span>" +
                            "<img class='rank-icon' " +
                            "style='padding-left:8px; padding-bottom:1px;' " +
                            "src='/img/mngr/drop_down.png' alt='▼'/>" +
                            "</div>"
                        );
                    }
                }
            },
            {id: "userEmail", header: "그룹원 이메일", css: "textLeft", width: 170},
            {id: "insertDt", sort:"string", header: "그룹 가입일", css: "textCenter", width: 100, fillspace:true}
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
        sortId2 = id;
        sortDir2 = order;

        // 정렬 3번 눌러서 초기화 되는 경우
        // 정렬 순서도 초기화
        if (id === 'id') {
            sortId2 = null;
            sortDir2 = null;
        }
    });

    $$("grid2").attachEvent("onAfterEditStop", function (state, editor) {
        if (state.value != state.old) {
            const rowId = editor.row;
            const item = this.getItem(rowId);
            item._dirty = 1; // 체크박스 자동 체크
            this.updateItem(rowId, item);
        }
    });

    $$("grid2").attachEvent("onBeforeEditStart", function(id){
        if (id.column === "groupUserRankCd") {
            const item = this.getItem(id.row);
            if (item.groupUserRankCd === "leader") return false; // 편집 금지
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

// 탈퇴버튼
listener.button.leave.click = function () {
    var param = $$("grid1").getSelectedItem()

    if (!param) {
        popup.alert.show('그룹을 선택해주세요.');
        return;
    }

    if (param.userId === USER_INFO.USER_ID) {
        popup.alert.show('그룹장의 경우 탈퇴가 불가능합니다.');
        return;
    }

    popup.confirm.show("그룹을 탈퇴하시겠습니까?", function(bool) {
        if (bool) {
            try {
                var callback = new Callback(function(result) {
                    if (result === '성공') {
                        popup.alert.show('그룹 탈퇴에 성공하였습니다.', function () {
                            $("#search").trigger("click");
                            $(window.parent.document)
                                .find(`.sidebar-top-level-item[data-program-id='${param.groupId}']`)
                                .remove();
                        });
                    } else {
                        popup.alert.show("그룹 탈퇴에 실패하였습니다.", function () {
                            // main 페이지를 새로고침
                            parent.refreshParent();
                        });
                    }
                });
                platform.postService("/groupmanage/groupLeave", param, callback);
            } catch (e) {}
        }
    });
}

listener.button.del.click = function () {
    var param = $$("grid1").getSelectedItem()

    if (!param) {
        popup.alert.show('그룹을 선택해주세요.');
        return;
    }

    if (param.userId !== USER_INFO.USER_ID) {
        popup.alert.show('그룹장만 그룹 삭제가 가능합니다.');
        return;
    }

    popup.confirm.show("그룹을 삭제하시겠습니까?", function(bool) {
        if (bool) {
            try {
                var callback = new Callback(function(result) {
                    if (result === '성공') {
                        popup.alert.show('그룹 삭제에 성공하였습니다.', function () {
                            $("#search").trigger("click");
                            $(window.parent.document)
                                .find(`.sidebar-top-level-item[data-program-id='${param.groupId}']`)
                                .remove();
                        });
                    } else {
                        popup.alert.show("그룹 삭제에 실패하였습니다.", function () {
                            // main 페이지를 새로고침
                            parent.refreshParent();
                        });
                    }
                });
                platform.postService("/groupmanage/groupDelete", param, callback);
            } catch (e) {}
        }
    });
}

// 수정버튼
listener.button.edit.click = function () {
    var param = $$("grid1").getSelectedItem()

    if (!param) {
        popup.alert.show('그룹을 선택해주세요.');
        return;
    }

    if (param.userId !== USER_INFO.USER_ID) {
        popup.alert.show('그룹장만 그룹 수정이 가능합니다.');
        return;
    }

    var callback = new Callback(function(result) {listener.button.search.click();});

    // 수정 팝업창 여는 함수
    // 수정창 닫을때마다 그룹 정보 갱신
    customPopup.show(`/groupmanage/groupUpdatePopup/${param.groupId}`, "그룹 수정", 780, 725, callback, param);
}