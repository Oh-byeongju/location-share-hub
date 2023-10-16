<%@ page import="com.sjinc.bss.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<link>
    <%@include file="/WEB-INF/jsp/frame/common/programIncludeSp.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>위치정보 공유 플랫폼</title>
    <link type="text/css" rel="stylesheet" href="css/project/main/userjoin.css">
    <script src="js/project/main/userjoin.js"></script>
</head>
<body>
    <div class="topLine">
        <a href="/login">
            <img src="/img/map_icon.png" class="topTitleIcon">
        </a>
        <h1 class="topTitle">
            위치정보 공유 플랫폼
        </h1>
    </div>
    <div class="joinLayout">
        <div class="joinTitle">
            회원가입
        </div>
        <form class="joinForm">
            <div class="inputArea">
                <div class="labelLayout">
                    <label class="labelInfo">
                        아이디
                    </label>
                </div>
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input id="idText" class="inputText" placeholder="아이디를 입력해주세요." maxlength="15" autocomplete="off">
                    </div>
                </div>
                <button id="idCheckButton" class="inputCheckButton" type="button">
                    중복확인
                </button>
            </div>
            <div class="inputArea">
                <div class="labelLayout">
                    <label class="labelInfo">
                        비밀번호
                    </label>
                </div>
                <div class="inputLayout">
                    <div class="inputCenter">
                        <input id="pwText" class="inputText" type="password" placeholder="비밀번호를 입력해주세요." maxlength="20">
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
                        <input id="nameText" class="inputText" placeholder="이름을 입력해주세요." maxlength="8" autocomplete="off">
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
                        <input id="emailText" class="inputText" placeholder="이메일을 입력해주세요." maxlength="49" autocomplete="off">
                    </div>
                </div>
                <button id="emailCheckButton" class="inputCheckButton" type="button">
                    중복확인
                </button>
            </div>
            <div class="joinButtonArea">
                <button id="joinButton" class="joinButton" type="button">
                    회원가입
                </button>
            </div>
        </form>
    </div>
    <%@include file="/WEB-INF/jsp/frame/common/popup.jsp" %>
</body>
</html>