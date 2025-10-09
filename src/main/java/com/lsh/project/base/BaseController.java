package com.lsh.project.base;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.model.LoginUserVo;
import com.lsh.framework.FrameConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
public class BaseController {

    //@Autowired
    //protected HttpSession httpSession; //생성자에 넣으려고 하였으나, 자식 class에서 주입을 별도로 해야 해서...autowired 처리함..
    protected String defaultPageViewPath;

    // 로그인 id 뽑는 메소드(LSH)
    protected static String getLoginId(HttpServletRequest request) {
        String result = "";

        HttpSession httpSession = request.getSession();
        if (httpSession != null) {
            Object obj = httpSession.getAttribute(FrameConstants.LOGIN_USER_ATTR);
            if (obj != null) {
                HashMapResultVO map = (HashMapResultVO) obj;
                result = (String) map.get("userId");
            }
        }

        return result;
    }
}
