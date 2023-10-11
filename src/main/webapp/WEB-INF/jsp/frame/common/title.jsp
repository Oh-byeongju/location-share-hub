<%@ page import="java.util.ArrayList" %>
<%@ page import="com.sjinc.bss.framework.FrameStringUtil" %>
<%@page language="java" pageEncoding="utf-8"%>

<div id="titleArea" style="width:calc(100% - 80px); height:80px; margin-left: 40px;">
	<div id="naviArea" style="float: left; width: 30%; line-height: 80px; text-overflow:
	ellipsis; overflow: hidden; white-space: nowrap;" title="${PTITLE.parentMenuNm}${PTITLE.pgmNm}">
		<span style="color:#292929; font-size:18px;font-weight: 500;">
			<c:if test="${not empty PTITLE.parentMenuNm }">
				${PTITLE.parentMenuNm} >
			</c:if>
		</span>
		<font style="color:#000; font-size:18px; font-weight:bold;">${PTITLE.pgmNm}</font>
		<c:if test="${not empty PTITLE.pgmId }">
			[${PTITLE.pgmId}]
		</c:if>
	</div>

	<div class="buttonArea" style="float: left; width: 70%; line-height: 80px; text-align: right;">
	<c:forEach var="pgmVo" items="${PTITLE.pgmBtnAuthList}">
		<c:choose>
			<c:when test="${pgmVo.btnGb eq 'INIT'}">
			<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="init">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'초기화') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'NEWS'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="news">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'신규') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'SEARCH'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="search">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'조회') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'SAVE'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="save">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'저장') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'DEL'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="del">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'삭제') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'EDIT'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="edit">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'수정') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'CLOSE'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="close">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'닫기') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'PRINT'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="print">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'출력') }</button>
			</c:when>

			<c:when test="${pgmVo.btnGb eq 'ETC1'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc1">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타1') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC2'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc2">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타2') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC3'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc3">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타3') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC4'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc4">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타4') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC5'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc5">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타5') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC6'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc6">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타6') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC7'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc7">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타7') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC8'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc8">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm, '기타8') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC9'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc9">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타9') }</button>
			</c:when>
			<c:when test="${pgmVo.btnGb eq 'ETC10'}">
				<button onclick="(top.btnMenu)?top.btnMenu(this):opener.top.btnMenu(this);" id="etc10">${FrameStringUtil.isNullDefaultValue(pgmVo.btnNm,'기타10') }</button>
			</c:when>
		</c:choose>
	</c:forEach>
	</div>
</div>