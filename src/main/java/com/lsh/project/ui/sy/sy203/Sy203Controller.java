package com.lsh.project.ui.sy.sy203;

import com.lsh.framework.data.HashMapVO;
import com.lsh.framework.model.base.BaseResponseVo;
import com.lsh.framework.FrameConstants;
import com.lsh.project.base.BaseController;
import com.lsh.project.commonmodule.menuprogram.MenuPgmDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 메뉴구성 Controller
 */

@Slf4j
@RestController
@RequestMapping(value = "/sy203")
public class Sy203Controller extends BaseController {

    private Sy203Service sy203Service;

    public Sy203Controller(MenuPgmDetails menuPgmDetails, Sy203Service sy203Service) {
        this.menuPgmDetails = menuPgmDetails;
        this.sy203Service = sy203Service;
    }
    
    /**
     * 메뉴구성 조회
     * @param request
     * @param response
     * @param programId
     * @return
     */
    @RequestMapping(value = "")
    public ModelAndView defaultPage(HttpServletRequest request, HttpServletResponse response, @RequestParam String programId) {

        //log.info("===> ui default page request parm : {}", uiDefaultPageRequestVo);
        return makeDefaultModelAndView(request, programId);
    }

    /**
     * 메뉴구성 저장
     * @param parm
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public BaseResponseVo save(@RequestBody HashMapVO parm) {
        BaseResponseVo responseVo = new BaseResponseVo();
        try {
            if (sy203Service.save(parm) > 0) {
                responseVo.makeResultOk();
            }
        } catch (Exception e) {
            responseVo.makeResultError();
            log.error(FrameConstants.ERROR_CONTROLLER, e);
        }

        return responseVo;
    }

}
