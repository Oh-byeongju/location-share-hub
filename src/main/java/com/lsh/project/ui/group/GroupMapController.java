package com.lsh.project.ui.group;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.FrameUtil;
import com.lsh.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 그룹 지도 조회 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/groupmap")
public class GroupMapController extends BaseController {
    private final GroupMapService groupMapService;

    // 그룹 지도 화면 리턴 컨트롤러
    @RequestMapping(value = "/{groupId}")
    public ModelAndView defaultPage(HttpServletRequest request, @PathVariable("groupId") String groupId) {
        // 그룹에 대한 정보 검색
        HashMapResultVO groupVO = groupMapService.groupInfoSearch(BaseController.getLoginId(request), groupId);

        // 그룹에 대한 마커목록 검색
        List<HashMapResultVO> markerVO = groupMapService.groupMarkersSearch(BaseController.getLoginId(request), groupId);

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "groupmap");
        modelAndView.addObject("groupVO", groupVO);
        modelAndView.addObject("MARKER_LIST", markerVO);

        return modelAndView;
    }

    // 그룹 정보 팝업 리턴 컨트롤러
    @RequestMapping(value = "/groupInfoPopup/{groupId}")
    public ModelAndView InfoPopup(@PathVariable("groupId") String groupId) {
        // 그룹에 대한 상세정보 검색
        HashMapResultVO groupVO = groupMapService.groupDetailInfoSearch(groupId);

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "groupInfoPopup");
        modelAndView.addObject("groupVO", groupVO);

        return modelAndView;
    }

    // 마커생성 팝업 리턴 컨트롤러
    @RequestMapping(value = "/markerCreatePopup")
    public ModelAndView MarkerCreatePopup() {
        // 마커분류 목록 조회
        List<HashMapResultVO> resultVO = groupMapService.markerCategoriesSearch();

        // jsp 리턴
        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "markerCreatePopup");
        modelAndView.addObject("CATEGORY_LIST", resultVO);

        return modelAndView;
    }

    // 마커생성 요청 컨트롤러
    @PostMapping(value = "/markerCreate")
    public HashMapResultVO markerCreate(HttpServletRequest request, @RequestBody HashMapResultVO requestMap) {
        // 현재 사용자 id, ip 뽑아서 map에 삽입 후 메소드 호출
        requestMap.put("userId", BaseController.getLoginId(request));
        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));

        return groupMapService.markerCreate(requestMap);
    }
}
