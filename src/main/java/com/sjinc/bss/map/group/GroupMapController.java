package com.sjinc.bss.map.group;

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
    private final GroupInsertService groupInsertService;

    // 그룹 지도 화면 리턴 컨트롤러
    @RequestMapping(value = "/{groupId}")
    public ModelAndView defaultPage(HttpServletRequest request, @PathVariable("groupId") String groupId) {
        System.out.println(groupId);
        return new ModelAndView("/project/map/" + "groupmap" + "/" + "groupmap");
    }

//    // 그룹 가입 팝업 리턴 컨트롤러
//    @RequestMapping(value = "/popup")
//    public ModelAndView insertPopup(HttpServletRequest request) {
//        return new ModelAndView("/project/map/groupinsert/groupJoinPopup");
//    }
//
//    // 그룹 검색 컨트롤러
//    @PostMapping(value = "/groupSearch")
//    public List<HashMapResultVO> groupSearch(@RequestBody HashMapStringVO requestMap) {
//        // 버튼 누를때 post로 던져서 날라옴
//        // pgminfo 여기안에 input 내용이 있음
//        return groupInsertService.groupSearch(requestMap.get("pgminfo"));
//    }
//
//    // 그룹 가입 컨트롤러
//    @PostMapping(value = "/groupJoin")
//    public HashMapResultVO groupJoin(HttpServletRequest request, @RequestBody HashMapResultVO requestMap) {
//
////        1. 이미 가입된 그룹인지
////        2. 그룹에서 차단된건 아닌지
////        3. 그룹 비밀번호가 맞는지
////        System.out.println(requestMap.get("groupId"));
////        System.out.println(requestMap.get("groupPw"));
////        System.out.println(BaseController.getLoginId(request));
//
//        // 현재 사용자 id 뽑아서 map에 삽입 후 메소드 호출
//        requestMap.put("userId", BaseController.getLoginId(request));
//
//        return groupInsertService.groupJoin(requestMap);
//    }
}
