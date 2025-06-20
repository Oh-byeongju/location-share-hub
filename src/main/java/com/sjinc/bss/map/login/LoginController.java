package com.sjinc.bss.map.login;

import com.sjinc.bss.framework.FrameConstants;
import com.sjinc.bss.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private final LoginService loginService;

    // 메인 jsp 컨트롤러
    @GetMapping("/")
    public ModelAndView main() {
        return new ModelAndView("project/main/login");
    }

    // 로그인 jsp 컨트롤러
    @GetMapping("/login")
    public ModelAndView login() {
        return new ModelAndView("project/main/login");
    }
    
    // 로그인 요청 컨트롤러
    @PostMapping("/login/loginRequest")
    public ResponseEntity<Void> loginRequest(HttpServletRequest httpServletRequest, @RequestBody Map<String, String> requestMap) {
        // 사용자 정보 검색
        HashMapResultVO userInfo = loginService.loginProcess(requestMap);
        
    	// 사용자 로그인 성공
    	if (userInfo != null) {
    		// Session이 없으면 생성 후 할당 (24시간)
    		httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);
            session.setAttribute(FrameConstants.LOGIN_USER_ATTR, userInfo);
            session.setMaxInactiveInterval(86400);

            // 성공 응답 보내기
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    	} else {
    		// 실패 응답 보내기
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    }

    // 로그아웃 요청 컨트롤러
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        try {
            HttpSession session = request.getSession();
            if (session != null) {
                session.removeAttribute(FrameConstants.LOGIN_USER_ATTR);
                session.invalidate();
            }
        } catch (Exception e) {
            log.error(FrameConstants.ERROR_SERVICE, e);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}