package com.sjinc.bss.framework;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Spring MVC Interceptor
 */

@Slf4j
public class FrameHandlerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 로그인 정보를 확인하고 존재하면 Controller로 넘김
        HttpSession session = request.getSession();
        if (session != null) {
            Object obj = session.getAttribute(FrameConstants.LOGIN_USER_ATTR);
            if (obj != null) {
                return true;
            }
        }

        // 로그인 정보가 없으면 리다이렉션
        response.sendRedirect(request.getContextPath() + "/login");
        return true;
    }
}
