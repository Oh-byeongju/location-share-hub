<%@ page import="com.lsh.framework.FrameDateUtil" %>
<%@ page import="com.lsh.framework.FrameConstants" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programIncludeSp.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>위치정보 공유 플랫폼</title>
    <link type="text/css" rel="stylesheet" href="css/project/main/login.css">
    <script src="js/project/main/login.js"></script>
</head>
<script>
    <%
         Object obj = session.getAttribute(FrameConstants.LOGIN_USER_ATTR);
                // 로그인세션 존재하면 메인으로
                if (obj != null) {
    %>
    document.location = commonContextPath + "/main";
    <%
        }
    %>
</script>
<body>
    <div class="topLine">
        <a href="/login">
            <img src="/img/map_icon.png" class="topTitleIcon">
        </a>
        <h1 class="topTitle">
            위치정보 공유 플랫폼
        </h1>
    </div>
    <div class="loginLayout">
        <div class="loginTitle">
            회원 로그인
        </div>
        <form class="loginForm">
            <div class="inputArea">
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input class="inputText" placeholder="아이디를 입력해주세요." maxlength="15" id="idText" type="text" autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="inputArea">
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input class="inputText" placeholder="비밀번호를 입력해주세요." maxlength="20" id="pwText" type="password">
                    </div>
                </div>
            </div>
            <div class="loginButtonArea">
                <button id="loginButton" type="button" disabled="true">
                    로그인
                </button>
            </div>
            <div class="joinButtonArea">
                <button id="joinButton" type="button">
                    회원가입하기
                </button>
            </div>
        </form>
    </div>
    <%@include file="/WEB-INF/jsp/frame/common/popup.jsp" %>
</body>
</html>