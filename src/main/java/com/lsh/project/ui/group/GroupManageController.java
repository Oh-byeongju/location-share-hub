package com.lsh.project.ui.group;

import com.lsh.framework.FrameUtil;
import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapStringVO;
import com.lsh.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 그룹 관리 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/groupmanage")
public class GroupManageController extends BaseController {
    private final GroupManageService groupManageService;

    // 그룹 관리 화면 리턴 컨트롤러
    @RequestMapping(value = "")
    public ModelAndView defaultPage(@RequestParam String programId) {
        return new ModelAndView("/project/map/" + programId + "/" + programId);
    }

    // 그룹 검색 컨트롤러
    @PostMapping(value = "/groupSearch")
    public List<HashMapResultVO> groupSearch(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // 버튼 누를때 post로 던져서 날라옴
        // pgminfo 여기안에 input 내용이 있음
        requestMap.put("userId", BaseController.getLoginId(request));
        return groupManageService.groupSearch(requestMap);
    }

    // 그룹 탈퇴 컨트롤러
    @PostMapping(value = "/groupLeave")
    public String groupLeave(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        requestMap.put("userId", BaseController.getLoginId(request));
        return groupManageService.groupLeave(requestMap);
    }




    //////////////////////////////////////////////////////////// 아래로 보기

    // 그룹 생성 팝업 리턴 컨트롤러
    @RequestMapping(value = "/groupCreatePopup")
    public ModelAndView CreatePopup() {
        return new ModelAndView("/project/map/groupinsert/groupCreatePopup");
    }

    // 그룹 생성 요청 컨트롤러
    @PostMapping("/groupCreate")
    public ResponseEntity<Void> groupCreate(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // 현재 사용자 id, ip 뽑아서 map에 삽입 후 메소드 호출
        // 그룹원 등급도 삽입
        requestMap.put("userId", BaseController.getLoginId(request));
        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));
        requestMap.put("groupRank", "leader");

        //groupInsertService.groupCreate(requestMap);

        // NO_CONTENT로 성공 처리 알림
        // DB 삽입 실패시 스프링이 알아서 던져주는 500 error로 프론트단에서 오류 체크
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
