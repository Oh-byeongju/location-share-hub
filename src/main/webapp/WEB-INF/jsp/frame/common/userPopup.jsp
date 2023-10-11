<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c6"      uri="http://java.sun.com/jsp/jstl/core"%>
<c6:set var="myContextPath" value="${pageContext.request.contextPath}"/>
<script type="text/javascript" src="${myContextPath}/js/frame/ui/userPopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
<div id="userPopupWindow" class="popupBackground" style="display: none;">
	<div id="userContainer" style="">
		<div id="userTitle" style="">
			사용자 정보
			<button id="user_popup_close" onclick="popup.user.callback.callback();popup.user.hide();"></button>
		</div>
		<div style="display: inline-block; width: 100%; text-align: right; padding-right: 5px; margin-top: 5px;">
			<button id="user_popup_search">조회</button>
			<button id="user_popup_select">선택</button>
		</div>
		<form id="userSearchArea" class="userSearchArea">
			<div class="searchRow">
				<label for="user_userinfo">사용자ID/명</label>
				<input id="user_userinfo" name="user_userinfo" type="text" maxlength="100" style="width: 100px;" data-field="userinfo"/>
			</div>
		</form>
		<div id="user_popup_grid1" style="margin-left: 5px; margin-top: 5px; width: calc(100% - 10px); height: calc(100% - 135px);"></div>
	</div>
</div>