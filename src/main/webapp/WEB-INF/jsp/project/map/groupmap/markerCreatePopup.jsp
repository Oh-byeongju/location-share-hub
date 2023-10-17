<%@ page import="com.sjinc.bss.framework.FrameDateUtil" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="/WEB-INF/jsp/frame/common/programHeader.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/WEB-INF/jsp/frame/common/programInclude.jsp"%>
    <script type="text/javascript" src="${myContextPath}/js/project/map/markerCreatePopup<spring:message key="js.addext"/>.js?ver=<spring:message key="js.version"/>"></script>
    <link type="text/css" rel="stylesheet" href="${myContextPath}/css/frame/common/groupInfoPopup.css">
    <script src="https://cdn.ckeditor.com/ckeditor5/29.1.0/classic/ckeditor.js"></script>
    <style>
        #editor p {
            color: black !important;
            font-size: 100px;
        }
    </style>
</head>
<body>
    <div class="infoLayout">
        <div class="infoArea">
            <div class="labelLayout">
                <label class="labelInfo">
                     이거를 바까야한다~
                </label>
            </div>

        </div>

        <div class="infoArea">
            <div class="labelLayout">
                <p style="color: black">
                    라이브러리 충돌이 있음 고민되네
                    This is some sample content.</p>
            </div>

        </div>


        <div id="editor">
            <p style="color: black">This is some sample content.</p>
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