package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupInsertService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "groupInsert";


    // 그룹 검색 메소드
    public List<HashMapResultVO> groupSearch(String groupId) {

        System.out.println(groupId);

        // 그룹 기본정보 검색 후 리턴
        return primarySqlSessionTemplate.selectList(namespace+".selectByLikeId", groupId);
    }
}
