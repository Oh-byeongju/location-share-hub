<%@ page import="com.lsh.framework.FrameDateUtil" %>
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
        <%--console.log('${markerVO}')--%>
        <%--// 그룹 정보 변수 할당--%>
        <%--const groupId = '${groupVO.groupId}';--%>
        <%--const groupLat = '${groupVO.groupLat}';--%>
        <%--const groupLong = '${groupVO.groupLong}';--%>
        <%--const groupLev = '${groupVO.groupLev}';--%>
        <%--const groupUserRankCd = '${groupVO.groupUserRankCd}';--%>



        // 리뷰 리스트 가공
        const reviewList = [
            <c:forEach var="review" items="${reviewVO}" varStatus="loop">
            {
                markerReviewNo: '${review.markerReviewNo}',
                markerReviewDts: '${review.markerReviewDts}'.substring(0, 19),
                reviewLike: "${review.reviewLike}",
                likeCount: ${review.likeCount},
                userId: "${review.userId}",
                userNm: "${review.userNm}",
                markerReviewText: "${review.markerReviewText}",
            }
            <!-- 마지막 아이템이 아니면 쉼표 추가 -->
            <c:if test="${not loop.last}">,</c:if>
            </c:forEach>
        ];

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
                <span class="markerCreator_Day">
                    ${markerVO.insertDt}
                </span>
                <span class="markerCreator_Day">
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
            <div class="reviewWriteArea">
                <div class="reviewWrite">
                    <div class="writeLayout">
                        <textarea id="writeForm" class="writeForm" placeholder="마커의 리뷰를 작성해주세요." maxlength="99"></textarea>
                        <div class="writeInfo">
                            <div id="writeNumber" class="writeNumber">
                                0 / 100
                            </div>
                            <div class="writeButtonArea">
                                <button id="writeButton" class="writeButton">
                                    작성하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="reviewList">
            <div class="reviewListLayout">
                <div class="sortButtonArea">
                    <button id="newSort" class="newSort">
                        최신순
                    </button>
                    <button id="likeSort" class="likeSort">
                        공감순
                    </button>
                </div>
                <div class="reviewDataArea">
                    <ul class="commentData">
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>