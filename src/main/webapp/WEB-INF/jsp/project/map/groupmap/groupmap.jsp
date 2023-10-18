<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="${myContextPath}/css/project/main/groupmap.css">
	<%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp" %>
	<script type="text/javascript" src="${myContextPath}/js/project/map/groupmap<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
<%--	카카오 지도 api--%>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=fb8bef5737e279bc3e7236391517d158&libraries=services,clusterer,drawing"></script>
	<script>
		// 그룹 정보 변수 할당
		const groupId = '${groupVO.groupId}';
		const groupLat = '${groupVO.groupLat}';
		const groupLong = '${groupVO.groupLong}';
		const groupLev = '${groupVO.groupLev}';
		const groupUserRankCd = '${groupVO.groupUserRankCd}';
	</script>
</head>
<body>
	<div id="titleArea">
		<div id="naviArea" style="float: left; width: 30%; line-height: 80px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${groupVO.groupNm} 그룹 지도">
			<span style="color:#292929; font-size:20px; font-weight: 600;">
				${groupVO.groupNm} 그룹 지도
			</span>
		</div>
		<div class="buttonArea" style="float: left; width: 70%; line-height: 80px; text-align: right;">
			<button id="create">
				마커생성
			</button>
			<button id="search">
				그룹정보
			</button>
		</div>
	</div>
	<div class="formTitle" style="top: 100px; width:calc(100% - 80px); height:calc(100% - 107px)">
		<div class="mapWrap">
			<div id="map" style="width:100%;height:100%;position:relative;"></div>
			<div class="mapAddr">
				<span class="mapTitle">지도중심기준 행정동 주소정보</span>
				<span id="centerAddr"></span>
			</div>
		</div>
	</div>
</body>
</html>