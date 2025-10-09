<%@ page import="com.lsh.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp"%>
    <script type="text/javascript" src="${myContextPath}/js/project/map/groupJoinPopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
</head>
<body>
    <%@include file="/WEB-INF/jsp/frame/common/title.jsp" %>
<style>
    .formRow>label:not(.radio) {
        min-width: 140px;
    }
    .buttonArea {
        float: none !important;
        width: 100% !important;
        text-align: right !important;
        line-height: 60px;
    }
</style>
<form id="postForm" name="postForm" class="formArea" style="left:20px; top:35px" width: calc(100% - 60px); border:1px solid #eee; onsubmit="return false;">

    <div class="formRow c2">
        <label for="pwd">비밀번호</label>
        <input id="pwd" name="pwd" type="password" maxlength="30" style="width:calc(100% + 60px);"
               data-field="pwd"/>
        <span id="spanmsg1"></span>
    </div>

</form>
    <div class="buttonArea">
        <button class="yesButton" id="submitButton" style="margin-right: 5px">
            확인
        </button>
        <button class="noButton" style="margin-right: 20px" onclick="customPopup.hide();">
            취소
        </button>
    </div>

</body>
</html>