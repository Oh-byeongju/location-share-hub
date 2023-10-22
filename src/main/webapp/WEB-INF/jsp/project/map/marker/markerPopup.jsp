<%@ page import="com.sjinc.bss.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude2.jsp"%>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/markerPopup.css">
    <script type="text/javascript" src="${myContextPath}/js/project/map/markerPopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
    <script>
        console.log('${markerVO}')
        <%--// 그룹 정보 변수 할당--%>
        <%--const groupId = '${groupVO.groupId}';--%>
        <%--const groupLat = '${groupVO.groupLat}';--%>
        <%--const groupLong = '${groupVO.groupLong}';--%>
        <%--const groupLev = '${groupVO.groupLev}';--%>
        <%--const groupUserRankCd = '${groupVO.groupUserRankCd}';--%>
    </script>
</head>

<body>
    <div class="infoLayout">
        <div class="infoHeader">
            <div class="infoTitle">
                ${markerVO.markerNm}
            </div>
            <div class="infoSubTitle">
                ${markerVO.markerAddress}
                <span class="markerCreator">
                    ${markerVO.userNm}
                </span>
                <span class="markerCategory">
                    ${markerVO.cdNm}
                </span>
            </div>
        </div>
        <div class="infoContent">
            <div class="markerContent">
                ${markerVO.markerText}
            </div>
        </div>
        <div class="infoReview">
            <div class="reviewHeader">
                <div class="reviewTitle">
                    리뷰
                </div>
            </div>
            <div class="markerContent">

            </div>
        </div>





    </div>
</body>
</html>