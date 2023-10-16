<%@ page import="com.sjinc.bss.framework.FrameStringUtil" %>
<%@ page import="com.sjinc.bss.project.commonmodule.menuprogram.MenuPgmVo" %>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<c:set var="myContextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head http-equiv="Cache-control" content="no-cache">
    <title>위치정보 공유 플랫폼</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <link rel="shortcut icon" href="${myContextPath}/img/project/favi/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="${myContextPath}/img/project/favi/favicon.ico" type="image/x-icon" />

    <%@include file="/WEB-INF/jsp/frame/common/programIncludeSp.jsp" %>
    <%@include file="/WEB-INF/jsp/frame/common/sessionCheck.jsp" %>

    <link rel="stylesheet" type="text/css" href="${myContextPath}/css/project/main/main.css?ver=<spring:message key="css.version"/>">
    <script type="text/javascript" src="${myContextPath}/js/project/main/main<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>

</head>
<body style="overscroll-behavior: contain;">

<div id="topArea">
    <div class="topDivL" style="cursor : pointer;display: flex;align-items: center" onclick="window.location.reload();">
        <img alt="로고" src="${myContextPath}/img/project/logo/map_logo.png" class="logoImg" />
        <div style="font-size: 20px;font-weight: bold;letter-spacing: -0.1px;padding-left: 10px;">위치정보 공유 플랫폼</div>
    </div>
    <div class="topDivR">
        <div class="LogOutImg btn">
            <div class="icoLogout"></div>로그아웃
        </div>
    </div>
    <div class="topDivR">
        <span class="clsUserNm">[<%=FrameStringUtil.isNullDefaultValue(USER_NM, "Guest") %>]</span><span class="clsUserTxt">님 환영합니다.</span>
    </div>
</div>

<div id="menuArea">
	<span>
		<form id="subMenuArea" name="subMenuArea" onsubmit="return false;" target="programFrame" method="post">
			<input type="hidden" id="programId" name="programId" />
			<input type="hidden" id="programName" name="programName" />
			<input type="hidden" id="programPathName" name="programPathName" />
			<input type="hidden" id="bizGb" name="bizGb" />
            <input type="hidden" id="openParm" name="openParm">

			<ul class="sidebar-top-level-items">
                <c:forEach var="groupVO" items="${GROUP_LIST}" varStatus="status">
                    <li class="sidebar-top-level-item" title="${groupVO.groupNm} 그룹"
                        data-program-id="${groupVO.groupId}"
                        data-program-name="${groupVO.groupId}"
                        data-program-path="/groupmap/${groupVO.groupId}"
                        data-program-path-name="${groupVO.groupId}"
                        data-program-rmrk="${groupVO.groupId}">
                        <a class="sidebar-top-level-item-header">
                            <div class="menuIco">
                                <img class="menu-image" src="/img/project/menuicon/ico-menu-03.png">
                            </div>
                            <span class="nav-item-name">
                                ${groupVO.groupNm} 그룹
                            </span>
                        </a>
                    </li>
                </c:forEach>

                <li class="sidebar-top-level-item" title="그룹 가입 / 생성"
                    data-program-id="groupinsert"
                    data-program-name="groupinsert"
                    data-program-path="groupinsert"
                    data-program-path-name="groupinsert"
                    data-program-rmrk="groupinsert" >
                    <a class="sidebar-top-level-item-header">
                        <div class="menuIco">
                            <img class="menu-image" src="/img/project/menuicon/ico-menu-06.png">
                        </div>
                        <%--<img alt="메뉴" title="${menuVo.menuNm}" class = "menuIco" style="display:flex" src="${myContextPath}${menuVo.menuImg}"/>--%>
                        <span class = "nav-item-name" >
                            그룹 가입 / 생성
                        </span>
                    </a>
                </li>

                <li class="sidebar-top-level-item" title="그룹 관리"
                    data-program-id="sy101"
                    data-program-name="sy101"
                    data-program-path="sy101"
                    data-program-path-name="sy101"
                    data-program-rmrk="sy101">
                    <a class="sidebar-top-level-item-header">
                        <div class="menuIco">
                            <img class="menu-image" src="/img/project/menuicon/ico-menu-02.png">
                        </div>
                        <%--<img alt="메뉴" title="${menuVo.menuNm}" class = "menuIco" style="display:flex" src="${myContextPath}${menuVo.menuImg}"/>--%>
                        <span class = "nav-item-name" >
                            그룹 관리
                        </span>
                    </a>
                </li>
                <a class="toggle-sidebar-button js-toggle-sidebar" type="button">
                    <span class="collapse-text">&lt;&lt;</span>
                </a>
            </ul>

		</form>
	</span>
        <span style="display: none">
		<span></span>
		<span id="menuOpen">&lt;</span>
		<span></span>
	</span>
</div>


<%--여기에 밀어넣기--%>
<div id="programArea">
    <iframe id="programFrame" name="programFrame" src="" frameborder="0" scrolling="no" ></iframe>
</div>

<div id="messageArea"></div>

<template id="messageBoxTemplate">
    <div class="messageHeader">
        <div class="messageTitle">{title}</div>
        <div class="messageClose" onclick="removeBox(this);"> X </div>
    </div>
    <div class="messageBody">
        <div class="messageContent">{content}</div>
        <div class="messageBtnMove" onclick="btnMessageMoveClick(this);"> [ 이동 ] </div>
    </div>
</template>

<div id="footerArea">
    <div class="fLeftArea"></div>
    <div class="fCenterArea"><span>Copyright@2023 SEJUNG I&C. All Rights Reserverd.</span></div>
    <div class="fRightArea"></div>
</div>

<%@include file="/WEB-INF/jsp/frame/common/userPopup.jsp" %>
<%@include file="/WEB-INF/jsp/frame/common/attachFilePopup.jsp" %>
<%@include file="/WEB-INF/jsp/frame/common/popup.jsp" %>
<%@include file="/WEB-INF/jsp/frame/common/customPopup.jsp" %>
<%@include file="/WEB-INF/jsp/frame/common/filePopup.jsp" %>
</body>
</html>