package com.sjinc.bss.framework;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class FrameKeyGlobals {

    @Value("${kakao.api.key}")
    private String kakaoApiKey;

    @ModelAttribute("kakaoApiKey")
    public String kakaoApiKey() {
        return kakaoApiKey;
    }
}
