package com.lsh.project.ui.marker;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapStringVO;
import com.lsh.framework.data.HashMapVO;
import com.lsh.framework.FrameUtil;
import com.lsh.project.base.BaseController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 마커 관련 컨트롤러
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/marker")
public class MarkerController extends BaseController {
    private final MarkerService markerService;

    // 마커 즐겨찾기 컨트롤러
    @RequestMapping(value = "/bookmark")
    public String markerBookmark(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO markerMap = new HashMapVO();
        markerMap.put("userId", BaseController.getLoginId(request));
        markerMap.put("markerNo", Integer.parseInt(requestMap.get("markerNo")));
        markerMap.put("insertIP", FrameUtil.getRemoteIP(request));

        return markerService.markerBookmark(markerMap);
    }

    // 마커 삭제 컨트롤러
    @RequestMapping(value = "/delete")
    public String markerDelete(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO markerMap = new HashMapVO();
        markerMap.put("markerNo", Integer.parseInt(requestMap.get("markerNo")));

        return markerService.markerDelete(markerMap);
    }

    // 마커 상세정보 화면 리턴 컨트롤러
    @RequestMapping(value = "/markerDetail/{markerNo}")
    public ModelAndView defaultPage(HttpServletRequest request, @PathVariable("markerNo") String markerNo) {
        // 마커 상세정보 검색
        HashMapResultVO markerVO = markerService.markerSearch(Integer.parseInt(markerNo));
        // 마커 리뷰 검색
        List<HashMapResultVO> reviewVO = markerService.markerReviewSearch(Integer.parseInt(markerNo), BaseController.getLoginId(request), "최신");

        ModelAndView modelAndView = new ModelAndView("/project/map/" + "marker" + "/" + "markerPopup");
        modelAndView.addObject("markerVO", markerVO);
        modelAndView.addObject("reviewVO", reviewVO);

        return modelAndView;
    }

    // 마커 리뷰목록 조회 메소드
    @RequestMapping(value = "/markerList/{markerNo}")
    public List<HashMapResultVO> markerList(HttpServletRequest request, @PathVariable("markerNo") String markerNo, @RequestParam("sort") String sort) {
        String check = null;
        if (sort.equals("like")) {
            check = "공감";
        } else {
            check = "최신";
        }

        // 마커 리뷰 검색
        return markerService.markerReviewSearch(Integer.parseInt(markerNo), BaseController.getLoginId(request), check);
    }

    // 마커 리뷰작성 컨트롤러
    @RequestMapping(value = "/reviewWrite")
    public String reviewWrite(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO markerMap = new HashMapVO();
        markerMap.put("userId", BaseController.getLoginId(request));
        markerMap.put("markerNo", Integer.parseInt(requestMap.get("markerNo")));
        markerMap.put("markerReviewText", requestMap.get("markerReviewText"));
        markerMap.put("insertIP", FrameUtil.getRemoteIP(request));

        return markerService.reviewWrite(markerMap);
    }

    // 마커 리뷰공감 컨트롤러
    @RequestMapping(value = "/review/like")
    public String reviewLike(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO reviewMap = new HashMapVO();
        reviewMap.put("userId", BaseController.getLoginId(request));
        reviewMap.put("markerReviewNo", Integer.parseInt(requestMap.get("reviewNo")));
        reviewMap.put("insertIP", "0:0:0:0:0:1");

        return markerService.reviewLike(reviewMap);
    }

    // 마커리뷰 삭제 컨트롤러
    @RequestMapping(value = "/reviewDelete")
    public String reviewDelete(HttpServletRequest request, @RequestBody HashMapStringVO requestMap) {
        // DB에 사용되는 값 매핑
        HashMapVO markerMap = new HashMapVO();
        markerMap.put("markerReviewNo", Integer.parseInt(requestMap.get("reviewNo")));

        return markerService.reviewDelete(markerMap);
    }
}
