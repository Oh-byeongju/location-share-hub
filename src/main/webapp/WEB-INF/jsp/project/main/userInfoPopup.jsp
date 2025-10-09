<%@ page import="com.lsh.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp"%>
    <script type="text/javascript" src="${myContextPath}/js/project/main/userInfoPopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/userInfoPopup.css">
</head>
<body>
<script>
    function initFrame() {}
</script>
<div class="infoLayout">
    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                회원 ID
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="userId" class="inputText" maxlength="20" value="${USER_INFO.userId}" disabled>
            </div>
        </div>
    </div>

    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                비밀번호
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="pwText" class="inputText" type="password" placeholder="변경할 비밀번호를 입력해주세요." maxlength="20">
            </div>
        </div>
    </div>

    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                비밀번호 확인
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="pwConfirmText" class="inputText" type="password" placeholder="비밀번호를 한번 더 입력해주세요." maxlength="20">
            </div>
        </div>
    </div>

    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                이름
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="nameText" class="inputText" placeholder="변경할 이름을 입력해주세요." value="${USER_INFO.userNm}" maxlength="8">
            </div>
        </div>
    </div>

    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                이메일
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="userEmail" class="inputText" maxlength="20" value="${USER_INFO.userEmail}" disabled>
            </div>
        </div>
    </div>

    <div class="inputArea">
        <div class="labelLayout">
            <label class="labelInfo">
                가입일자
            </label>
        </div>
        <div class="inputLayout">
            <div class="inputCenter">
                <input id="userInst" class="inputText" maxlength="20" value="${USER_INFO.insertDt}" disabled>
            </div>
        </div>
    </div>

    <div class="formTitle" style="left:0px; top: 420px; width:calc(100%); height:calc(100% - 500px)">
        <div class="buttonArea" style="text-align: right;">
            <button class="yesButton" id="submitButton" style="margin-right: 5px">
                수정
            </button>
            <button class="noButton" style="margin-right: 25px" onclick="customPopup.hide();">
                닫기
            </button>
        </div>
    </div>
</div>
</body>
</html>