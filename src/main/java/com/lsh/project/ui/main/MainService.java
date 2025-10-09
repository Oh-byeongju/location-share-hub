package com.lsh.project.ui.main;

import com.lsh.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class MainService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "com.lsh.project.main.entity.MainMapper";

    // 사용자가 가입된 그룹 조회 메소드
    @Transactional
    public List<HashMapResultVO> userGroupSearch(String userId) {
        return primarySqlSessionTemplate.selectList(namespace+".selectGroupsByUserId", userId);
    }

    // 사용자 정보 조회
    @Transactional(readOnly = true)
    public HashMapResultVO userInfoSearch(String userId) {
        return primarySqlSessionTemplate.selectOne(namespace+".selectUserInfoByUserId", userId);
    }

    // 사용자 회원정보 수정 메소드
    @Transactional
    public void userInfoModify(Map<String, String> requestMap) {
        primarySqlSessionTemplate.update(namespace+".updateUser", requestMap);
    }
}
