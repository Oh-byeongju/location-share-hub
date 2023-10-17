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
                    그룹 ID
                </label>
            </div>
            <span class="infoText" title="${groupVO.groupId}">
                ${groupVO.groupId}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    그룹명
                </label>
            </div>
            <span class="infoText" title="${groupVO.groupNm}">
                ${groupVO.groupNm}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    그룹장
                </label>
            </div>
            <span class="infoText" title="${groupVO.userId}">
                ${groupVO.userId}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    그룹장 이메일
                </label>
            </div>
            <span class="infoText" title="${groupVO.userEmail}">
                ${groupVO.userEmail}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    가입자 수
                </label>
            </div>
            <span class="infoText" title="${groupVO.userCount}">
                ${groupVO.userCount}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    생성된 마커수
                </label>
            </div>
            <span class="infoText" title="${groupVO.markerCount}">
                ${groupVO.markerCount}
            </span>
        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    그룹 생성일
                </label>
            </div>
            <span class="infoText" title="${groupVO.insertDt}">
                ${groupVO.insertDt}
            </span>
        </div>

        <div class="formTitle" style="left:0px; top: 420px; width:calc(100%); height:calc(100% - 500px)">
            <div class="buttonArea" style="text-align: right;">
                <button class="yesButton" style="margin-right: 25px" onclick="customPopup.hide();">
                    확인
                </button>
            </div>
        </div>
    </div>
</body>
</html>