package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
    public ModelAndView defaultPage(@PathVariable("groupId") String groupId) {
        // 그룹에 대한 정보 검색
        HashMapResultVO groupVO =  groupMapService.groupInfoSearch(groupId);

        // jsp 리턴
        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "groupmap");
        modelAndView.addObject("groupVO", groupVO);

        return modelAndView;
    }

    // 그룹 정보 팝업 리턴 컨트롤러
    @RequestMapping(value = "/groupInfoPopup/{groupId}")
    public ModelAndView InfoPopup(@PathVariable("groupId") String groupId) {
        // 그룹에 대한 상세정보 검색
        HashMapResultVO groupVO =  groupMapService.groupDetailInfoSearch(groupId);

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "groupInfoPopup");
        modelAndView.addObject("groupVO", groupVO);

        return modelAndView;
    }

    // 마커생성 팝업 리턴 컨트롤러
    // 이부분 수정하기 파라미터 받을꺼 있음 Post로 받아야함 결국
    @RequestMapping(value = "/markerCreatePopup")
    public ModelAndView MarkerCreatePopup() {
//        // 그룹에 대한 상세정보 검색
//        HashMapResultVO groupVO =  groupMapService.groupDetailInfoSearch(groupId);

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "groupInfoPopup");
//        modelAndView.addObject("groupVO", groupVO);

        return modelAndView;
    }
}
