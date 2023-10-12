var _openParm = {};

$(document).ready(function() {

    setMenuEvent();

    $('.toggle-sidebar-button').click();

    $(".LogOutImg").click(function() {
        btnLogoutClick();
    });

    $("#userInfo").click(function() {
        let callback = new Callback(function () { });
        customPopup.show("/myInfo?programId=SY000P1", "내정보", 750, 250, callback, { });
    });

    $('#btnAtte').click(function () {
        btnAtteClick();
    })

    $('#btnLeav').click(function () {
        btnLeavClick();
    })

    //getMessageBox();




/*
    if($('.btnProgram[data-program-id="CM103"]').length){
        $('.btnProgram[data-program-id="CM103"]').click();
    }else{
        $('.btnProgram[data-program-id="BD101"]').click();
    }
*/
    $('.btnProgram[data-program-id="'+$("#firstPgmId").text()+'"]').click();

    //이거를 어찌 잘쓰면 초기 메뉴를 따올꺼 같은데..
    // 제일 위에놈 한번만 클릭하게 만들면.
    $('.sidebar-top-level-item').click();


    $('.sidebar-top-level-item-header').on("mouseover",function (e){
        const imgSrc = $(this).children().get(0).children[0].src;
        if(imgSrc.indexOf("-ov") === -1) {
            $(this).children().get(0).children[0].src = imgSrc.replace(".png","-ov.png")
        }
    })

    $('.sidebar-top-level-item-header').on("mouseleave",function (e){
        const imgSrc = $(this).children().get(0).children[0].src;
        if(imgSrc.indexOf("-ov") !== -1) {
            $(this).children().get(0).children[0].src = imgSrc.replace("-ov.png",".png")
        }
    })
});

function setMenuEvent() {

    //sidebar toggle
    $('.toggle-sidebar-button').click(function(){
        $('.sidebar-top-level-item').removeClass('active');
        $('#subMenuArea').toggleClass('open');
        if($('#subMenuArea').hasClass('open')){
            $('#programArea').css({
                'width':'calc(100% - 227px)',
                'transition' : 'width 0.3s'
            });
        }else{
            $('#programArea').css({
                'width':'calc(100% - 62px)',
                'transition' : 'width 0.3s'
            });
        }
    });

    //menu toggle
    $('.sidebar-top-level-item').click(function(event){
        event.preventDefault();
        event.stopPropagation();



        $this = $(this);

        var form = $("form#subMenuArea")[0];

        var programObj = new Object();
        var programPath = $this.data("program-path");



        console.log(programObj)

        // 처음 렌더링 전용 click을 하나 만들면 안되려나 싶음
        // 어찌 count를 먹일 방법 찾아보기
        if (programPath !== 'groupinsert') {
            return;
        }


        if(isEmpty(programPath)) {
            popup.alert.show("프로그램 Path정보가 없어서 실행할 수 없습니다.");
            return;
        }

        $("#programId").val($this.data("program-id"));
        $("#programName").val($this.data("program-name"));
        $("#programPathName").val($this.data("program-path-name"));
        $("#bizGb").val($(".menuBtn.selected").html());

        var queryString = toQueryString(programObj);

        form.action = commonContextPath + programPath;
        form.submit();

        $("body").removeClass("mainBg");
        $(".clsSubMenu dl[data-selected='Y']").attr("data-selected", "N");
        $(".clsSubMenu li[data-selected='Y']").attr("data-selected", "N");

        $this.parent().closest("div").attr("data-selected", "Y");
        $this.attr("data-selected", "Y");


        if($('#subMenuArea').hasClass('open')){

            // $(this).toggleClass('active');

            if($(this).hasClass('active')){
                $(this).find('.sidebar-sub-level-items').css({
                    'margin-top' : '0px',
                });
            }
            else{
                let y = $('#subMenuArea').scrollTop();

                $(this).find('.sidebar-sub-level-items').css({
                    'margin-top' : (-54 - y) +'px',
                });
            }

        }
    });

    //menu toggle css
    $('.sidebar-top-level-item').mouseover(function(){

        let items = $(this).find('.sidebar-sub-level-items');
        if($(this).hasClass('active')){
            $(items).css({
                'margin-top' : '0px',
            });
        }else{
            let y = $('#subMenuArea').scrollTop();

            $(items).css({
                'margin-top' : (-y -54) +'px',
            });
        }
    });

    //menu toggle css
    $('.sidebar-top-level-item').mouseleave(function(){
        let items = $(this).find('.sidebar-sub-level-items');
        $(items).css({
            'margin-top' : '0px',
        });
    });
}

function btnLogoutClick() {
    popup.confirm.show("로그아웃 하시겠습니까?", function(bool) {
        if(bool) {
            try {
                var param = {"COMP_CD":USER_INFO.COMP_CD, "USER_ID":USER_INFO.USER_ID, "USER_IP":USER_INFO.USER_IP};
                var callback = new Callback(function(result) {
                    document.location = commonContextPath + '/login';
                });
                callback.setShowLoading(false);
                platform.postService("/logout", param, callback);
            } catch (e) {}
        }
    });
}


function btnAtteClick(){
    popup.confirm.show("출근 처리 하시겠습니까?", function(bool) {
        if(bool) {
            try {
                var param = {"compCd":USER_INFO.COMP_CD, "userId":USER_INFO.USER_ID, "deptCd":USER_INFO.DEPT_CD, "userIp":USER_INFO.USER_IP};
                var callback = new Callback(function(result) {
                    //console.log(result);
                    if ( result.comuAtteResultCode == "1000") {
                        popup.alert.show("처리가 완료되었습니다.");
                    } else if ( result.comuAtteResultCode == "1001") {
                        popup.alert.show("금일 근태가 이미 생성되어 있습니다.");
                    } else if ( result.comuAtteResultCode == "1002") {
                        popup.alert.show("근태관리 대상 사용자가 아닙니다.");
                    } else if ( result.comuAtteResultCode == "1003") {
                        popup.alert.show("근무 계획이 수립되어 있지 않습니다.\n관리자에게 문의 바랍니다.");
                    } else if ( result.comuAtteResultCode == "1004") {
                        popup.alert.show("근무유형에 대한 근무시간 범위가 없습니다.\n관리자에게 문의 바랍니다.");
                    } else  {
                        popup.alert.show("근태 처리 중 에러가 발생하였습니다.\n관리자에게 문의 바랍니다.");
                    }
                });
                callback.setShowLoading(false);
                platform.postService("/comuatte", param, callback);
            } catch (e) {}
        }
    });
}

function btnLeavClick(){
    popup.confirm.show("퇴근 처리 하시겠습니까?", function(bool) {
        if(bool) {
            try {
                var param = {"compCd":USER_INFO.COMP_CD, "userId":USER_INFO.USER_ID, "deptCd":USER_INFO.DEPT_CD, "userIp":USER_INFO.USER_IP};
                var callback = new Callback(function(result) {
                    //console.log(result);
                    if ( result.comuLeavResultCode == "2000") {
                        popup.alert.show("처리가 완료되었습니다.");
                    } else if ( result.comuLeavResultCode == "2001") {
                        popup.alert.show("금일 퇴근 근태가 이미 생성되어 있습니다.");
                    } else if ( result.comuLeavResultCode == "2002") {
                        popup.alert.show("근태관리 대상 사용자가 아닙니다.");
                    } else if ( result.comuLeavResultCode == "2003") {
                        popup.alert.show("근무 계획이 수립되어 있지 않습니다.\n관리자에게 문의 바랍니다.");
                    } else if ( result.comuLeavResultCode == "2004") {
                        popup.alert.show("근무유형에 대한 근무시간 범위가 없습니다.\n관리자에게 문의 바랍니다.");
                    } else if ( result.comuLeavResultCode == "2005") {
                        popup.alert.show("퇴근 처리가 필요 없는 근태(연차 등)가 이미 생성되어 있습니다.\n관리자에게 문의 바랍니다.");
                    } else  {
                        popup.alert.show("근태 처리 중 에러가 발생하였습니다.\n관리자에게 문의 바랍니다.");
                    }
                });
                callback.setShowLoading(false);
                platform.postService("/comuleav", param, callback);
            } catch (e) {}
        }
    });
}

const __mainMessage = {
    EP : {
        title: '결재 문서 도착 알림',
        content :'결재해야하는 [{count}] 건의 문서가 있습니다.',
    },
    TS : {
        title: '관제 상황 도착 알림',
        content :'확인해야 하는 관제전파가 [{count}] 있습니다.',
    }
};

function getMessageBox(){

    var parm ={};
    parm['compCd'] = USER_INFO.COMP_CD;
    parm['deptCd'] = USER_INFO.DEPT_CD;
    parm['userId'] = USER_INFO.USER_ID;
    parm['userIp'] = USER_INFO.USER_IP;

    var callback = new Callback(function(result) {

        $(result).each(function(){
            if(this.count<1){
                return true;
            }

            if(this.type != 'EP'){
                return true;
            }

            let messageHtml = document.querySelector('#messageBoxTemplate').innerHTML;

            messageHtml = messageHtml.replace("{title}", __mainMessage[this.type].title )
                .replace("{content}",__mainMessage[this.type].content)
                .replace('{count}', this.count);

            let el = document.createElement('div');
            $(el).addClass('messageBox');
            $(el).data('data',this);
            $(el).append(messageHtml);

            document.getElementById('messageArea').append(el);

            moveMessageBox(el);
            setTimeout(removeBox,1000 * 8, el);
        });
    });
    callback.setShowLoading(false);

    platform.postService("/mainMessageGrid", parm, callback);

    setTimeout(function(){
        getMessageBox();
    },1000 * 60);
}

function moveMessageBox(el){

    var bottmHeight= '50px';

    if($('#messageArea').html() !=''){
        bottmHeight = '300px';
    }

    $(el).animate({
        bottom : '50px'
    }, 1000, function(){
        setTimeout(function(el){
            $(el).animate({
                bottom: '-200px'
            },1000);
        },15000, el);
    });

}

function removeBox(el){
    if($(el).hasClass('messageBox')){
        el.remove();
    }{
        $(el).parents('.messageBox').remove();
    }
}

function btnMessageMoveClick(el){
    let data = $(el).parents('.messageBox').data('data');

    popup.confirm.show("이동 하시겠습니까?", function(bool) {
        if(bool){
            if(data.type == 'EP'){
                if($('.btnProgram[data-program-id="EP102"]').length){
                    $('.btnProgram[data-program-id="EP102"]').click();
                    removeBox(el);
                }
            }
        }
    });
}