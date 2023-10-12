package com.sjinc.bss.map.userjoin;

import com.sjinc.bss.framework.FrameUtil;
import com.sjinc.bss.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserJoinController {
    private final UserJoinService userJoinService;

    // 회원가입 jsp 컨트롤러
    @RequestMapping("/userjoin")
    public ModelAndView userjoin() {
        return new ModelAndView("/project/main/userjoin");
    }

    // 아이디 중복확인 컨트롤러
    @GetMapping("/userjoin/idCheck")
    public ResponseEntity<Void> idCheck(@RequestParam("id") String id) {
        // 성공 응답 보내기 (사용가능)
        if (!userJoinService.idCheck(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // 실패 응답 보내기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 이메일 중복확인 컨트롤러
    @GetMapping("/userjoin/emailCheck")
    public ResponseEntity<Void> emailCheck(@RequestParam("email") String email) {
        // 성공 응답 보내기 (사용가능)
        if (!userJoinService.emailCheck(email)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // 실패 응답 보내기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 회원가입 요청 컨트롤러
    @PostMapping("/userjoin/joinRequest")
    public ResponseEntity<Void> joinRequest(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        // ip 뽑아서 map에 넣고 회원가입 실행
        requestMap.put("insertIP", FrameUtil.getRemoteIP(request));
        userJoinService.userJoinProcess(requestMap);

        // NO_CONTENT로 성공 처리 알림
        // DB 삽입 실패시 스프링이 알아서 던져주는 500 error로 프론트단에서 오류 체크
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}