
var customPopupContextPath = ""; //"/ding";
var customPopup = {
    callback : null,    
    show : function(url, title, width, height, callback, params) {
        // 마커 정보에는 header 없애고 close 버튼 생성
        if (title === '마커 정보') {
            $("#customPopupTitle").css("display", "none !important");
            $("#customPopupTitle").css("display", "none");
            $("#customClose").css("display", "block !important");
            $("#customClose").css("display", "block");
        } else {
            $("#customPopupTitle").css("display", "flex !important");
            $("#customPopupTitle").css("display", "flex");
            $("#customClose").css("display", "none !important");
            $("#customClose").css("display", "none");
        }

        this.callback = callback;

        $(document).off("iframeready");

        $(document).on("iframeready", function(evt, frameId) {
            if (frameId == "customPopupFrame") {
                var frame = $("#customPopupFrame").get(0).contentWindow;
                var strInitFrame = "frame.initFrame(" + JSON.stringify(params) + ")";

                eval(strInitFrame);
            }
        });

        $("#customPopupFrame").attr("src", customPopupContextPath + url); /* for context path */
        $("#customPopupTitle").text(title);
        $("#customPopupContainer").css("width", width);
        $("#customPopupContainer").css("height", height);
        $("#customPopupContainer").css("left", "calc(50% - " + width / 2 + "px)");
        $("#customPopupContainer").css("top", "calc(50% - " + height / 2 + "px)");
        $("#customPopupWindow").css("display", "block");
        //$("#customClose").focus();
    },

    hide : function() {
        $("#customPopupWindow").css("display", "none");
        $("#customPopupFrame").attr("src", "");

        var strParam = "";

        for (var i = 0; i < arguments.length; i++) {
            strParam += "arguments[" + i + "]";

            if (i < arguments.length - 1) {
                strParam += ",";
            }
        }

        var strCallback = "this.callback.callback(" + strParam + ")";

        if (this.callback != null) {
            eval(strCallback);
        }
    }
};

$(document).ready(function() {
    $("#customPopupContainer").draggable({
        containment: "parent",
        cursor: "move"
    });
});