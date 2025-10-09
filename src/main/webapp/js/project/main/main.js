var _openParm = {};

$(document).ready(function() {

    setMenuEvent();

    $('.toggle-sidebar-button').click();

    $(".LogOutImg").click(function() {
        btnLogoutClick();
    });

    $('#btnAtte').click(function () {
        btnAtteClick();
    })

    $('#btnLeav').click(function () {
        btnLeavClick();
    })

    // 제일 첫번째 태그의 path
    // 처음에 렌더링 되면 처음 화면을 밀어넣어줌
    // 이미지도 변경
    const firstLiElement = $(".sidebar-top-level-item").first();
    firstLiElement.addClass('selected');

    const imgSrcElement = firstLiElement.find('.menuIco').find('img').get(0);
    const imgSrc = imgSrcElement.src;

    if (imgSrc.indexOf("-ov") === -1) {
        const newImgSrc = imgSrc.replace(".png", "-ov.png");
        imgSrcElement.src = newImgSrc;
    }

    const programPath = firstLiElement.data("program-path");

    $("#programId").val(firstLiElement.data("program-id"));
    $("#programName").val(firstLiElement.data("program-name"));
    $("#programPathName").val(firstLiElement.data("program-path-name"));

    var form = $("form#subMenuArea")[0];

    form.action = commonContextPath + programPath;
    form.submit();

    $("body").removeClass("mainBg");
    $(".clsSubMenu dl[data-selected='Y']").attr("data-selected", "N");
    $(".clsSubMenu li[data-selected='Y']").attr("data-selected", "N");

    $('.sidebar-top-level-item-header').on("mouseover",function (e){
        const parentIsActive = $(this).parent().hasClass('selected');

        if (!parentIsActive) {
            const imgSrc = $(this).children().get(0).children[0].src;
            if (imgSrc.indexOf("-ov") === -1) {
                $(this).children().get(0).children[0].src = imgSrc.replace(".png", "-ov.png");
            }
        }
    })

    $('.sidebar-top-level-item-header').on("mouseleave",function (e){
        const parentIsActive = $(this).parent().hasClass('selected');

        if (!parentIsActive) {
            const imgSrc = $(this).children().get(0).children[0].src;
            if (imgSrc.indexOf("-ov") !== -1) {
                $(this).children().get(0).children[0].src = imgSrc.replace("-ov.png", ".png")
            }
        }
    })

    // 동적으로 삽입된 a 태그 이벤트 추가
    $('.sidebar-top-level-items').on('mouseover', 'a', function(e) {
        const parentIsActive = $(this).parent().hasClass('selected');

        if (!parentIsActive) {
            const imgSrc = $(this).children().get(0).children[0].src;
            if (imgSrc.indexOf("-ov") === -1) {
                $(this).children().get(0).children[0].src = imgSrc.replace(".png", "-ov.png");
            }
        }
    })

    // 동적으로 삽입된 a 태그 이벤트 추가
    $('.sidebar-top-level-items').on('mouseleave', 'a', function(e) {
        const parentIsActive = $(this).parent().hasClass('selected');

        if (!parentIsActive) {
            const imgSrc = $(this).children().get(0).children[0].src;
            if (imgSrc.indexOf("-ov") !== -1) {
                $(this).children().get(0).children[0].src = imgSrc.replace("-ov.png", ".png")
            }
        }
    })


    // 동적으로 삽입된 li 태그 이벤트 추가
    $('.sidebar-top-level-items').on('click', 'li', function(event) {
        event.preventDefault();
        event.stopPropagation();

        var $this = $(this);

        var form = $("form#subMenuArea")[0];
        var programObj = new Object();
        var programPath = $this.data("program-path");

        if(isEmpty(programPath)) {
            popup.alert.show("아직 구현되지 않은 기능입니다.");
            return;
        }

        // 현재 li태그 'selected' 클래스 생성
        $(this).addClass('selected');
        // 다른 li에 'selected' 클래스 제거
        $('.sidebar-top-level-items li').not($this).removeClass('selected');

        // 모든 li에 대해 자식 img 태그의 src 속성 변경('selected' 안된것)
        $('.sidebar-top-level-items li').each(function () {
            if (!$(this).hasClass('selected')) {
                const imgSrcElement = $(this).find('.menuIco').find('img').get(0);
                const imgSrc = imgSrcElement.src;

                if (imgSrc.indexOf("-ov") !== -1) {
                    const newImgSrc = imgSrc.replace("-ov.png", ".png");
                    imgSrcElement.src = newImgSrc;
                }
            }
        });




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
    });
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