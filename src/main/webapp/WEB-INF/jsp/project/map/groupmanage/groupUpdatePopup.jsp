<%@ page import="com.lsh.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp"%>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/groupUpdatePopup.css">
    <script type="text/javascript" src="${myContextPath}/js/project/map/groupUpdatePopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
    <%--	카카오 지도 api--%>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services"></script>
</head>
<body>
    <form class="createForm">
        <div class="inputArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    아이디
                </label>
            </div>
            <div class="inputLayout">
                <div class="inputCenter">
                    <input id="groupIdText" class="inputText" placeholder="아이디를 입력해주세요." maxlength="15" autocomplete="off" value="${groupInfo.groupId}" disabled>
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
                    <input id="groupPwText" class="inputText" placeholder="비밀번호를 입력해주세요." maxlength="20" type="password">
                </div>
            </div>
        </div>

        <div class="inputArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    그룹명
                </label>
            </div>
            <div class="inputLayout">
                <div class="inputCenter">
                    <input id="groupNmText" class="inputText" placeholder="그룹명을 입력해주세요." maxlength="20" autocomplete="off" value="${groupInfo.groupNm}">
                </div>
            </div>
        </div>

        <div class="textArea">
            * 아래 지도를 활용해 그룹 지도의 초기 위치를 설정해주세요!
        </div>

        <div class="formTitle" style="left:0px; top: 220px; width:calc(100%); height:calc(100% - 330px)">
            <div class="mapWrap">
                <div id="map" style="width:100%;height:100%;position:relative;"></div>
                <div class="mapAddr">
                    <span class="mapTitle">지도중심기준 행정동 주소정보</span>
                    <span id="centerAddr"></span>
                </div>
            </div>
            <div id="mapLevel" class="mapText" style="margin-top: 7px">
                지도 레벨 : ${groupInfo.groupLev}
            </div>
            <div id="mapLat" class="mapText">
                중심 위도 : ${groupInfo.groupLat}
            </div>
            <div id="mapLong" class="mapText">
                중심 경도 : ${groupInfo.groupLong}
            </div>
            <div class="buttonArea" style="text-align: right;">
                <button class="yesButton" id="submitButton" style="margin-right: 5px">
                    수정
                </button>
                <button class="noButton" style="margin-right: 20px" onclick="customPopup.hide();">
                    취소
                </button>
            </div>
        </div>
    </form>
</body>
</html>