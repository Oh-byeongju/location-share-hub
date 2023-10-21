package com.sjinc.bss.map.marker;

import com.sjinc.bss.framework.FrameUtil;
import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.framework.data.HashMapStringVO;
import com.sjinc.bss.framework.data.HashMapVO;
import com.sjinc.bss.map.group.GroupMapService;
import com.sjinc.bss.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 마커 관련 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/marker")
public class MarkerController extends BaseController {
    private final MarkerService markerService;

    // 마커 상세정보 화면 리턴 컨트롤러
    @RequestMapping(value = "/markerDetail/{markerNo}")
    public ModelAndView defaultPage(HttpServletRequest request, @PathVariable("markerNo") String markerNo) {
//        // 그룹에 대한 정보 검색
//        HashMapResultVO groupVO = groupMapService.groupInfoSearch(BaseController.getLoginId(request), groupId);
//        // 그룹에 대한 마커목록 검색
//        List<HashMapResultVO> markerVO = groupMapService.groupMarkersSearch(groupId);

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "marker" + "/" + "markerPopup");
//        modelAndView.addObject("groupVO", groupVO);
//        modelAndView.addObject("MARKER_LIST", markerVO);

        return modelAndView;
    }

    // 마커 즐겨찾기 컨트롤러
    @RequestMapping(value = "/bookmark")
    public String markerBookmark(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO markerMap = new HashMapVO();
        markerMap.put("userId", BaseController.getLoginId(request));
        markerMap.put("markerNo", Integer.parseInt(requestMap.get("markerNo")));
        markerMap.put("insertIP", FrameUtil.getRemoteIP(request));

        return markerService.markerBookmark(markerMap);
    }
}
