<%@ page import="com.sjinc.bss.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp"%>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/groupInfoPopup.css">
</head>
<body>
<script>
    function initFrame() {}
</script>
    <div class="infoLayout">
        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    여기를 싹 바까야함
                </label>
            </div>
            <span class="infoText" title="테스트">
                테스트
            </span>
        </div>



<%--        <div class="formTitle" style="left:0px; top: 420px; width:calc(100%); height:calc(100% - 500px)">--%>
<%--            <div class="buttonArea" style="text-align: right;">--%>
<%--                <button class="yesButton" style="margin-right: 25px" onclick="customPopup.hide();">--%>
<%--                    확인--%>
<%--                </button>--%>
<%--            </div>--%>
<%--        </div>--%>
    </div>
</body>
</html>