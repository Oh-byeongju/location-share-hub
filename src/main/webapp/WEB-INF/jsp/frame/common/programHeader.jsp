<%@ page import="com.lsh.framework.FrameStringUtil"%>
<%@ page import="com.lsh.framework.FrameConstants"%>
<%@ page import="java.util.Enumeration" %>
<%@ page import="org.springframework.util.ObjectUtils" %>
<%@ page language="java" pageEncoding="utf-8"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	request.setCharacterEncoding("utf-8");
%>