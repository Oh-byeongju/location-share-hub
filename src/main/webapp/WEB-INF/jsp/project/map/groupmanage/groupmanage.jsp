<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp" %>
<script type="text/javascript" src="${myContextPath}/js/project/map/groupmanage<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
<style>
.formRow>label {
	min-width: 140px;
}

.button {
	padding-left: 15px;
	padding-right: 15px;
	margin-left: 10px;
	height: 32px;
	line-height: 32px;
	min-width: 80px;
	background-image: linear-gradient(rgb(122, 122, 122), rgb(122, 122, 122));
	color: rgb(238, 238, 238);
	font-size: 14px;
	font-weight: 400;
	border: none;
}

button:hover {
	background-image: linear-gradient(#676767, #676767);
	color: #fff;
}

.button:disabled {
	background-image: linear-gradient(#676767, #676767);
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#53565a', endColorstr='#53565a');
	border: 1px solid #676767;
	color:#fff;
}
</style>
</head>
<body>
	<div id="titleArea" style="width:calc(100% - 80px); height:80px; margin-left: 40px;">
		<div id="naviArea" style="float: left; width: 30%; line-height: 80px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="그룹 관리">
			<span style="color:#292929; font-size:20px; font-weight: 600;">
				그룹 관리
			</span>
		</div>
		<div class="buttonArea" style="float: left; width: 70%; line-height: 80px; text-align: right;">
			<button id="search">
				조회
			</button>
			<button id="leave">
				탈퇴
			</button>
			<button id="del">
				삭제
			</button>
			<button id="edit">
				수정
			</button>
		</div>
	</div>

	<form id="searchArea">
		<div class="searchRow">
			<label for="P_pgmInfo">그룹명</label>
			<input id="P_pgmInfo" name="P_pgmInfo" type="text" size="20" maxlength="20" data-field="pgminfo"/>
		</div>
	</form>

	<!-- 왼쪽 제목 -->
	<div class="formTitle" style="position:absolute; top:145px; left:40px; width:calc(55% - 80px); text-align:left;">
		가입 그룹 정보
	</div>

	<!-- 오른쪽 제목 -->
	<div class="formTitle" style="position:absolute; top:145px; left:calc(55%); width:calc(45% - 40px); text-align:left">
		그룹원 정보
	</div>
	<button class="button" style="position:absolute; top:145px; left:calc(100% - 130px)">
		저장
	</button>

	<div id="grid1" style="position:absolute; top:185px; left:40px; width:calc(55% - 80px); height:calc(100% - 192px);"></div>
	<div id="grid2" style="position:absolute; top:185px; left:calc(55%); width:calc(45% - 40px); height:calc(100% - 192px);"></div>
</body>
<iframe id="fileIframe" name="fileIframe" style="position: absolute; left:-50px; width:0;"></iframe>
</html>