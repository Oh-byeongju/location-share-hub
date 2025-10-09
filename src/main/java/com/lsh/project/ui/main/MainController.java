package com.lsh.project.ui.main;

import com.lsh.framework.FrameConstants;
import com.lsh.framework.FrameUtil;
import com.lsh.framework.data.HashMapResultVO;
import com.lsh.project.base.BaseController;
import com.lsh.project.ui.login.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController extends BaseController {
    private final MainService mainService;
    private final LoginService loginService;

    // 메인화면 리턴 컨트롤러
    @RequestMapping(value = "/main")
    public ModelAndView main(HttpServletRequest request) {
        // 사용자 아이디 추출
        String username = BaseController.getLoginId(request);

        // 가입된 그룹 추출
        List<HashMapResultVO> resultVO = mainService.userGroupSearch(username);

        // jsp 리턴
        ModelAndView modelAndView = new ModelAndView("/project/main/main");
        modelAndView.addObject("GROUP_LIST", resultVO);

        return modelAndView;
    }

    // 회원정보 팝업 리턴 컨트롤러
    @RequestMapping(value = "/main/userInfoPopup")
    public ModelAndView userInfoPopup(HttpServletRequest request) {
        // 사용자 아이디 추출
        String username = BaseController.getLoginId(request);

        // 회원정보 조회
        HashMapResultVO resultVO = mainService.userInfoSearch(username);

        ModelAndView modelAndView = new ModelAndView("/project/main/userInfoPopup");
        modelAndView.addObject("USER_INFO", resultVO);

        return modelAndView;
    }

    // 회원정보 수정 컨트롤러
    @PostMapping(value = "/main/userInfoModify")
    public ResponseEntity<Void> userInfoModify(HttpServletRequest request, @RequestBody Map<String, String> requestMap) {
        requestMap.put("userId", BaseController.getLoginId(request));
        requestMap.put("updateIP", FrameUtil.getRemoteIP(request));
        mainService.userInfoModify(requestMap);

        // 사용자 정보
        HashMapResultVO userInfo = new HashMapResultVO();
        userInfo.put("userId", BaseController.getLoginId(request));
        userInfo.put("userNm", requestMap.get("userNm"));
        userInfo.put("userEmail", requestMap.get("userEmail"));

        // 세션값 갱신
        request.getSession().invalidate();
        HttpSession session = request.getSession(true);
        session.setAttribute(FrameConstants.LOGIN_USER_ATTR, userInfo);
        session.setMaxInactiveInterval(86400);

        // NO_CONTENT로 성공 처리 알림
        // DB 수정 실패시 스프링이 알아서 던져주는 500 error로 프론트단에서 오류 체크
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
