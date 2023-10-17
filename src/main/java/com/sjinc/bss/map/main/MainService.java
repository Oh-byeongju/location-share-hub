package com.sjinc.bss.map.main;

import com.sjinc.bss.framework.data.HashMapResultVO;
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
    private final static String namespace = "com.sjinc.bss.project.main.entity.MainMapper";

    // 사용자가 가입된 그룹 조회 메소드
    @Transactional
    public List<HashMapResultVO> userGroupSearch(String userId) {
        return primarySqlSessionTemplate.selectList(namespace+".selectGroupsByUserId", userId);
    }
}
