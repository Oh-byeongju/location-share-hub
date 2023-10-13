package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.framework.data.HashMapStringVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupInsertService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "groupInsert";

    // 그룹 검색 메소드
    public List<HashMapResultVO> groupSearch(String groupId) {
        // 그룹 기본정보 검색 후 리턴
        return primarySqlSessionTemplate.selectList(namespace+".selectByLikeId", groupId);
    }

    // 그룹 가입 메소드
    @Transactional
    public HashMapResultVO groupJoin(HashMapResultVO requestMap) {
        // 그룹 정보 검색(id, pw 일치 확인)
        HashMapResultVO group = primarySqlSessionTemplate.selectOne(namespace+".selectGroupByIdAndPassword", requestMap);

        // 그룹원 정보 검색
        HashMapResultVO group_user = primarySqlSessionTemplate.selectOne(namespace+".selectGroupUserByIdsAndRank", requestMap);

        // 그룹 비번은 맞췄고, 그룹에 가입된 기록이 없을 때
        if (group != null && group_user == null) {
            // 그룹 정보 리턴
            return group;
        } else {
            // 그룹 가입 불가시 null map 리턴
            return new HashMapResultVO();
        }
    }
}
