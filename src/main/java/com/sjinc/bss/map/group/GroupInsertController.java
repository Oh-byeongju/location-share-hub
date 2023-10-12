package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.framework.data.HashMapStringVO;
import com.sjinc.bss.project.base.BaseController;
import com.sjinc.bss.project.commonmodule.menuprogram.MenuPgmDetails;
import com.sjinc.bss.project.ui.sy.sy201.Sy201Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 그룹 가입 생성 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/groupinsert")
public class GroupInsertController extends BaseController {
    private final GroupInsertService groupInsertService;

    // 그룹 가입 / 생성 화면 리턴 컨트롤러
    @RequestMapping(value = "")
    public ModelAndView defaultPage(HttpServletRequest request, @RequestParam String programId) {
        return new ModelAndView("/project/map/" + programId + "/" + programId);
    }

    // 그룹 검색 컨트롤러
    @PostMapping(value = "/groupSearch")
    public List<HashMapResultVO> groupSearch(@RequestBody HashMapStringVO requestMap) {
        // 버튼 누를때 post로 던져서 날라옴
        // pgminfo 여기안에 input 내용이 있음
        return groupInsertService.groupSearch(requestMap.get("pgminfo"));
    }
}
