package com.lsh.project.ui.sy.sy999;

import com.lsh.project.base.BaseController;
import com.lsh.project.commonmodule.menuprogram.MenuPgmDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 메뉴정보 Controller
 */

@Slf4j
@RestController
public class Sy999Controller extends BaseController {


    public Sy999Controller(MenuPgmDetails menuPgmDetails) {
        this.menuPgmDetails = menuPgmDetails;
    }


    @RequestMapping(value = "/sy999")
    public ModelAndView defaultPage(HttpServletRequest request, HttpServletResponse response, @RequestParam String programId) {
        return makeDefaultModelAndView(request, programId);
    }


}
