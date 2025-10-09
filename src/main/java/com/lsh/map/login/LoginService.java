package com.lsh.map.login;

import com.lsh.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "login";

    // 사용자 id, pw 확인 메소드
    @Transactional
    public HashMapResultVO loginProcess(Map<String, String> requestMap) {
        return primarySqlSessionTemplate.selectOne(namespace+".selectByIdAndPw", requestMap);
    }
}
