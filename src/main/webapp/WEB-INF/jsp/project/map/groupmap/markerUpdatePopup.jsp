<%@ page import="com.lsh.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude2.jsp"%>
    <script type="text/javascript" src="${myContextPath}/js/project/map/markerUpdatePopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/markerUpdatePopup.css">
    <script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/super-build/ckeditor.js"></script>
    <script>
        // 카테고리 리스트 가공
        const categoryList = [
            <c:forEach var="category" items="${CATEGORY_LIST}" varStatus="loop">
            <!-- category의 필드를 JavaScript 객체로 사용 -->
            { id: '${category.cd}', value: "${category.cdNm}", name: '${category.cd}' }
            <!-- 마지막 아이템이 아니면 쉼표 추가 -->
            <c:if test="${not loop.last}">,</c:if>
            </c:forEach>
        ];
    </script>
</head>
<body>
    <div class="CreateLayout">
        <div class="CreateArea">
            <div class="labelLayout">
                <label class="labelInfo">
                     마커주소
                </label>
            </div>
            <div class="inputLayout">
                <div class="inputCenter">
                    <input id="markerAddress" class="inputText" disabled type="text" value="${MARKER_INFO.markerAddress}">
                </div>
            </div>
        </div>
        <div class="CreateArea">
            <div class="labelLayout">
                <label class="labelInfo">
                    마커이름
                </label>
            </div>
            <div class="inputLayout">
                <div class="inputCenter">
                    <input id="markerName" class="inputText" maxlength="29" autocomplete="off" type="text" placeholder="마커 이름을 입력해주세요.">
                </div>
            </div>
        </div>
        <div class="CreateArea" style="margin-bottom: 25px;">
            <div class="labelLayout" style="width: 118px">
                <label class="labelInfo">
                    마커분류
                </label>
            </div>
            <div class="inputLayout">
                <div id="selectBox" class="inputCenter" style="width: 100px;"></div>
            </div>
        </div>
        <div id="editor"></div>
        <div class="formTitle" style="left:0px; top: 637px; width:calc(100%); height:calc(100% - 700px)">
            <div class="buttonArea" style="text-align: right;">
                <button id="submitButton" class="yesButton" style="margin-right: 5px">
                    수정
                </button>
                <button class="noButton" style="margin-right: 40px" onclick="customPopup.hide();">
                    취소
                </button>
            </div>
        </div>
    </div>
</body>
</html>