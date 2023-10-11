package com.sjinc.bss.map.main;

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
public class MainController {

    @RequestMapping(value = "/main")
    public ModelAndView main(HttpServletRequest request) {

        // 원래 상속 받아서 사용하게 되있는데 이부분은 메소드로 빼도 안되려나..
//        // 로그인 사용자 정보
//        LoginUserVo loginUserVo = getLoginUserDetails(request);

//        //menu/pgm 목록을 불러 온다.
//        ArrayList<MenuPgmVo> menuList = menuPgmDetails.getMenulistByUserGroup(loginUserVo.getCompCd(), loginUserVo.getUserGbCd());
//        log.info(menuList.toString());


        ModelAndView modelAndView = new ModelAndView("/project/main/main");
//        modelAndView.addObject("MENU_LIST", menuList);

//        // 시스템 이름
//        String systemName = systemConfigDetails.getSystemName();
//        modelAndView.addObject("systemName", systemName);

        return modelAndView;
    }

//    @RequestMapping(value = "/mainMessageGrid", method = RequestMethod.POST)
//    @ResponseBody
//    public List<MainMessageDto> selectMessage(@RequestBody MainMessageRequestVo parm) {
//        List<MainMessageDto> list = null;
//        try {
//            list = mainService.selectMessage(parm);
//        } catch (Exception e) {
//
//            log.error(FrameConstants.ERROR_CONTROLLER, e);
//        }
//
//        return list;
//    }
}
