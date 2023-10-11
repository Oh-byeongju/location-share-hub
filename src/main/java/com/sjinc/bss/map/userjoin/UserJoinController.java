package com.sjinc.bss.map.userjoin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UserJoinController {
    // 회원가입 jsp 컨트롤러
    @RequestMapping("/userjoin")
    public ModelAndView userjoin() {
        return new ModelAndView("/project/main/userjoin");
    }

    // 아이디 중복확인 컨트롤러
    @GetMapping("/userjoin/idCheck")
    public ResponseEntity<Void> idCheck(@RequestParam("id") String id) {




        if (id.equals("qqq")) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // 실패 응답 보내기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 이메일 중복확인 컨트롤러
    @GetMapping("/userjoin/emailCheck")
    public ResponseEntity<Void> emailCheck(@RequestParam("email") String email) {




        if (email.equals("qqq")) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // 실패 응답 보내기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}