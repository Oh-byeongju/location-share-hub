package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.FrameUtil;
import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.project.base.BaseController;
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
        HashMapResultVO groupVO =  groupMapService.groupInfoSearch(BaseController.getLoginId(request), groupId);

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
    @RequestMapping(value = "/markerCreatePopup")
    public ModelAndView MarkerCreatePopup() {
        // 마커분류 목록 조회
        List<HashMapResultVO> resultVO = groupMapService.markerCategoriesSearch();

        // jsp 리턴
        ModelAndView modelAndView = new ModelAndView("/project/map/" + "groupmap" + "/" + "markerCreatePopup");
        modelAndView.addObject("CATEGORY_LIST", resultVO);

        return modelAndView;
    }

    /**
    * 일단 저거 넣는건 문제가 안될거임
     * 마커 넣기전에 그룹원 등급도 한번 조회하고 해야함
     *
     *
     * 우선 마커를 어떻게 생성하고 밀어넣을것인가를 고민해보기.
    * */


    // 마커생성 요청 컨트롤러
//    @PostMapping(value = "/markerCreate")
//    public HashMapResultVO groupJoin(HttpServletRequest request, @RequestBody HashMapResultVO requestMap) {
////        1. 이미 가입된 그룹인지
////        2. 그룹에서 차단된건 아닌지
////        3. 그룹 비밀번호가 맞는지
//
//        // 현재 사용자 id, ip 뽑아서 map에 삽입 후 메소드 호출
//        // 그룹원 등급도 삽입
//        requestMap.put("userId", BaseController.getLoginId(request));
//        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));
//        requestMap.put("groupRank", "normal");
//
//        return groupInsertService.groupJoin(requestMap);
//    }

    // 마커 생성시
//    특별 아래론 못쓰게 만들어야함
//--> html에서 한번 검사하고 spring에서도  검사해야함
    // spring에서 검사하고 저기 콜백에서 오류나면 리프레시 한번 해줘야함(타이밍때매 등급 체크를 못했을경우를 대비)




    // 이거는 나중에 수정-->**
    // 메인에서 가져오는 group 버튼 순서 맞추려면
    // 부질의 말고 join써서 만들어야함 (쿼리 수정)

}
