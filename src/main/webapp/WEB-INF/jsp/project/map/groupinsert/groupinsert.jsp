<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp" %>
<script type="text/javascript" src="${myContextPath}/js/project/map/groupinsert<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
<style>
.formRow>label {
	min-width:140px;
}
</style>
</head>
<body>
	<div id="titleArea" style="width:calc(100% - 80px); height:80px; margin-left: 40px;">
		<div id="naviArea" style="float: left; width: 30%; line-height: 80px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="그룹 가입 / 생성">
			<span style="color:#292929; font-size:20px; font-weight: 600;">
				그룹 가입 / 생성
			</span>
		</div>
		<div class="buttonArea" style="float: left; width: 70%; line-height: 80px; text-align: right;">
			<button id="search">
				조회
			</button>
			<button id="join">
				가입
			</button>
			<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="init">
				${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'생성') }
			</button>
		</div>
	</div>

	<form id="searchArea">
		<div class="searchRow">
			<label for="P_pgmInfo">그룹명</label>
			<input id="P_pgmInfo" name="P_pgmInfo" type="text" size="20" maxlength="20" data-field="pgminfo" data-format="upper"/>
		</div>
	</form>

	<div class="formTitle" style="top:145px;">그룹 정보</div>
	<div id="grid1" style="position:absolute; top:185px; left:40px; width:calc(100% - 80px); height:calc(100% - 192px);"></div>
</body>
<iframe id="fileIframe" name="fileIframe" style="position: absolute; left:-50px; width:0;"></iframe>
</html>