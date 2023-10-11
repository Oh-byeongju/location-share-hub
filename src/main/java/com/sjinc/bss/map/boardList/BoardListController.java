package com.sjinc.bss.map.boardList;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BoardListController {
    // 임시 컨트롤러
    @RequestMapping("/test")
    public ModelAndView testMethod() {
        return new ModelAndView("project/main/test");
    }
}
