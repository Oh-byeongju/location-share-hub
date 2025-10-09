package com.lsh.map.userjoin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserJoinService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "userjoin";

    // 사용자 id 중복확인 메소드
    @Transactional
    public boolean idCheck(String userId) {
        // 중복이면 false 리턴
        if (primarySqlSessionTemplate.selectOne(namespace+".selectById", userId) == null) {
            return false;
        }

        // 중복 아니면 true 리턴
        return true;
    }

    // 사용자 email 중복확인 메소드
    @Transactional
    public boolean emailCheck(String userEmail) {
        // 중복이면 false 리턴
        if (primarySqlSessionTemplate.selectOne(namespace+".selectByEmail", userEmail) == null) {
            return false;
        }

        // 중복 아니면 true 리턴
        return true;
    }

    // 사용자 회원가입 메소드
    @Transactional
    public void userJoinProcess(Map<String, String> requestMap) {
        primarySqlSessionTemplate.insert(namespace+".insertUser", requestMap);
    }
}
