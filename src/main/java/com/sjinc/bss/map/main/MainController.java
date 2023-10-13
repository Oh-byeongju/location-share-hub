package com.sjinc.bss.map.main;

import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController extends BaseController {
    private final MainService mainService;

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
}
