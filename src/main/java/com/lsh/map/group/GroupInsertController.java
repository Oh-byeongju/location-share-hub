package com.lsh.map.group;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapStringVO;
import com.lsh.framework.FrameUtil;
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
 * 그룹 가입 / 생성 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/groupinsert")
public class GroupInsertController extends BaseController {
    private final GroupInsertService groupInsertService;

    // 그룹 가입 / 생성 화면 리턴 컨트롤러
    @RequestMapping(value = "")
    public ModelAndView defaultPage(@RequestParam String programId) {
        return new ModelAndView("/project/map/" + programId + "/" + programId);
    }

    // 그룹 검색 컨트롤러
    @PostMapping(value = "/groupSearch")
    public List<HashMapResultVO> groupSearch(@RequestBody HashMapStringVO requestMap) {
        // 버튼 누를때 post로 던져서 날라옴
        // pgminfo 여기안에 input 내용이 있음
        return groupInsertService.groupSearch(requestMap.get("pgminfo"));
    }

    // 그룹 가입 팝업 리턴 컨트롤러
    @RequestMapping(value = "/groupJoinPopup")
    public ModelAndView insertPopup() {
        return new ModelAndView("/project/map/groupinsert/groupJoinPopup");
    }

    // 그룹 가입 요청 컨트롤러
    @PostMapping(value = "/groupJoin")
    public HashMapResultVO groupJoin(HttpServletRequest request, @RequestBody HashMapResultVO requestMap) {
//        1. 이미 가입된 그룹인지
//        2. 그룹에서 차단된건 아닌지
//        3. 그룹 비밀번호가 맞는지

        // 현재 사용자 id, ip 뽑아서 map에 삽입 후 메소드 호출
        // 그룹원 등급도 삽입
        requestMap.put("userId", BaseController.getLoginId(request));
        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));
        requestMap.put("groupRank", "normal");

        return groupInsertService.groupJoin(requestMap);
    }

    // 그룹 생성 팝업 리턴 컨트롤러
    @RequestMapping(value = "/groupCreatePopup")
    public ModelAndView CreatePopup() {
        return new ModelAndView("/project/map/groupinsert/groupCreatePopup");
    }

    // 그룹 ID 중복확인 컨트롤러
    @GetMapping("/idCheck")
    public ResponseEntity<Void> idCheck(@RequestParam("groupId") String groupId) {
        // 성공 응답 보내기 (사용가능)
        if (!groupInsertService.idCheck(groupId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // 실패 응답 보내기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 그룹 생성 요청 컨트롤러
    @PostMapping("/groupCreate")
    public ResponseEntity<Void> groupCreate(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // 현재 사용자 id, ip 뽑아서 map에 삽입 후 메소드 호출
        // 그룹원 등급도 삽입
        requestMap.put("userId", BaseController.getLoginId(request));
        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));
        requestMap.put("groupRank", "leader");

        groupInsertService.groupCreate(requestMap);

        // NO_CONTENT로 성공 처리 알림
        // DB 삽입 실패시 스프링이 알아서 던져주는 500 error로 프론트단에서 오류 체크
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
