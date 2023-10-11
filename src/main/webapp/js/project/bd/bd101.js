let __bdTabEnabled = false;

function initPage() {
    setTimeout(function(){
        listener.button.search.click();
    },300)
}

webix.ready(function() {
    grid = webix.ui({
        id : "grid1",
        container : "grid1",
        view : "datagrid",
        columns : [
            {id: "rnum", editor: "", header: "NO", sort: "string", css: "textCenter", width : 100},
            {id: "annoTitl", editor: "", header: "제목", sort: "string", css: "textLeft", width : 70, fillspace:true},
            {id: "files", editor: "", header: "첨부", sort: "string", css: "textCenter", width : 120},
            {id: "hits", editor: "", header: "조회수", sort: "string", css: "textCenter", width : 100},
            {id: "postRegUserNm", editor: "", header: "작성자", sort: "string", css: "textCenter", width : 100},
            {id: "regDd", editor: "", header: "등록일", sort: "string", css: "textCenter", width : 100},
        ],
    });

    grid.attachEvent("onAfterLoad", function(){
        grid.eachRow(function(rowId){
            const record = grid.getItem(rowId);

            if(record['emerYn']== 'Y'){
                $$("grid1").addRowCss(rowId, "webix_row_red");
            }
            if(record['annoYn']== 'Y'){
                $$("grid1").addRowCss(rowId, "webix_row_bold");
            }

            if(parent._openParm.annoYmon != null && parent._openParm.annoSeq != null){
                if(parent._openParm.annoYmon == record.annoYmon && parent._openParm.annoSeq == record.annoSeq){
                    $("#postForm").setData(record);
                    //$('#annoCont1').html(record.annoCont);
                    __bdTabEnabled = true;
                    viewTab(1);
                    setEDITORText(record.annoCont);
                    saveHit(record);
                    getGrid2(record);
                }
            }
        });
        parent._openParm = {};
    });
});


listener.button.news.click = function(){
    customPopup.show("/bd101/p1?programId=BD101P01", "공지사항 작성", 1000, 700
        , new Callback(function(result){
        if(result != null && result != '' && result != undefined && result == true){
            listener.button.search.click();
        }
    }), {
        editMode : 'new'
    });
}

listener.button.init.click = function() {
    $("#searchArea").reset();
    $("#postForm").reset();
    $$("grid1").clearData();
    $('#attachArea').empty();
    $('#refrCont1').empty();
    $("#fileDownloadForm").reset();
    viewTab(0);
    __bdTabEnabled = false;
}

listener.button.search.click = function () {
    if (!$("#searchArea").checkValidation()) {
        return;
    }

    var param = $("#searchArea").getData();
    param['regDd1'] = replcDate(param["regDd1"]);
    param['regDd2'] = replcDate(param["regDd2"]);

    var callback = new Callback(function(result) {
        let data = result.resultVO;
        $(data).each(function(){
            if(this.atfiCnt > 0){
                this['files'] = 'Y';
            }
        });
        $$("grid1").setData(data);
    });

    param["queryid"] = "bd101.selectGrid";
    platform.postService("/common/selectList", param, callback);
}

listener.gridRow.click = function(record) {
    $("#postForm").setData(record);
    //$('#annoCont1').html(record.annoCont);
    __bdTabEnabled = true;
    viewTab(1);
    setEDITORText(record.annoCont);
    saveHit(record);
    getGrid2(record);
}

function setEDITORText(content){
    $('#annoContFrame').contents().find("body").html(content);
    const height = $('#annoContFrame').contents().find("body").height() + 20;
    console.log(height);
    $('#annoContFrame').css('height', `${height}px`);
    $('#postForm').scrollTop(0);
}

function getGrid2(data){
    $("#fileDownloadForm").reset();
    $('#annoAttach').empty();

    if(data.atfiId == null || data.atfiId == undefined || data.atfiId == ''){
        return false;
    }

    var callback = new Callback(function(result) {
        let data = result.resultVO;
        $(data).each(function() {
            setAttach(this);
        });
    });

    data["queryid"] = "common.selectAttachList";
    platform.postService("/common/selectList", data, callback);

}

function setAttach(parm){

    const element = document.createElement('div');
    $(element).addClass('attach-item');

    var fileSize = parm['fileSize'] / 1024 / 1024;
    fileSize = fileSize < 1 ? fileSize.toFixed(3) : fileSize.toFixed(1);

    let html = '<span class="origFileNm">' +  parm['origFileNm'] + '</span>'+
        '<span class="fileSize"> (' + fileSize  + 'MB)</span>' ;

    $(element).html(html);
    $(element).data('dataitem',parm);

    $('#annoAttach').append(element);

    $(element).click(function(){
        var dataitem = $(this).data('dataitem');
        download(dataitem);
    });

}

function download(data){
    __downloadFlag = true;
    $('#fileCompCd').val(data.compCd);
    $('#fileAtfiId').val(data.atfiId);
    $('#fileAtfiSeq').val(data.atfiSeq);
    $('#fileServPath').val(data.servPath);
    $('#fileServFileNm').val(data.servFileNm);
    $('#fileOrigFileNm').val(data.origFileNm);

    var form = document.getElementById("fileDownloadForm");

    form.submit();
}

function btnModifyClick() {
    var data = $('#postForm').getData();
    data['editMode'] = 'edit';
    customPopup.show("/bd101/p1?programId=BD101P01", "공지사항 수정", 1000, 700
        , new Callback(function(result){
        if(result == true){
            getDetail();
            listener.button.search.click();
        }
    }), data);
}

function btnDeleteClick(){

    popup.confirm.show("삭제 하시겠습니까?", function(result) {
        if (result) {
            var callback = new Callback(function(result) {
                if(result.resultCode == POST_RESULT.SUCCESS){
                    popup.alert.show("삭제되었습니다", function() {
                        $("#postForm").reset();
                        $('#annoAttach').empty();
                        $('#annoCont').empty();
                        $("#fileDownloadForm").reset();
                        viewTab(0);
                        __bdTabEnabled = false;
                        listener.button.search.click();
                    });
                }else{
                    popup.alert.show("삭제 중 문제가 발생되었습니다.\r\n관리자에게 문의하세요.", function() {
                    });
                }
            });

            var parm = $('#postForm').getData();
            parm['userId'] = USER_INFO.USER_ID;
            parm['userIp'] = USER_INFO.USER_IP;

            platform.postService("/bd101/delete", parm, callback);
        }
    });

}

function detailReset(){
    $("#postForm").reset();
    $('#annoAttach').empty();
    $('#annoCont').empty();
    $("#fileDownloadForm").reset();
    viewTab(0);
    __bdTabEnabled = false;
    listener.button.search.click();
}

function saveHit(data){

    var callback = new Callback(function(result) {
    });
    data["queryid"] = "bd101.updateGridHit";
    platform.postService("/common/update", data, callback);
}

function getDetail() {

    var parm = $('#postForm').getData();

    var callback = new Callback(function(result) {
        let data = result.resultVO;
        $("#postForm").setData(data);
        setEDITORText(data.annoCont);
        //$('#annoCont1').html(result.annoCont);
        getGrid2(data);
    });

    parm["queryid"] = "bd101.selectDetail";
    platform.postService("/common/selectOne", parm, callback);
}

function viewTab(tabIndex){
    if( !__bdTabEnabled){
        return false;
    }

    $('.tabContent').removeClass('selected');
    $('#tabContent'+tabIndex).addClass('selected');
    $('#tabArea .tabNavi').removeClass('tabSelected');
    $('#tabT'+tabIndex).find('.tabNavi').addClass('tabSelected');
    $$("grid1").adjust();
}

var __downloadFlag = false;
function downloadCallback(event){
    if(__downloadFlag){
        popup.alert.show("다운로드중 문제가 발생하였습니다. 관리자에게 문의하세요.");
    }
}