package com.lsh.project.ui.group;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapStringVO;
import com.lsh.framework.data.HashMapVO;
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
    @Transactional(readOnly = true)
    public List<HashMapResultVO> groupSearch(HashMapStringVO requestMap) {
        HashMapVO groupMap = new HashMapVO();
        groupMap.put("userId", requestMap.get("userId"));
        groupMap.put("groupId", requestMap.get("pgminfo"));

        // 그룹 기본정보 검색 후 리턴
        return primarySqlSessionTemplate.selectList(namespace+".selectByLikeId", groupMap);
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
            // 그룹 가입 후 그룹 정보 리턴
            primarySqlSessionTemplate.insert(namespace+".joinMapGroupUser", requestMap);
            return group;
        } else {
            // 그룹 가입 불가시 null map 리턴
            return new HashMapResultVO();
        }
    }

    // 그룹 id 중복확인 메소드
    @Transactional
    public boolean idCheck(String groupId) {
        // 중복이면 false 리턴
        if (primarySqlSessionTemplate.selectOne(namespace+".selectByGroupId", groupId) == null) {
            return false;
        }

        // 중복 아니면 true 리턴
        return true;
    }

    // 그룹 생성 메소드
    @Transactional
    public void groupCreate(HashMapStringVO requestMap) {
        // 쿼리문에 Integer가 있어서 형변환 시킴
        HashMapVO groupMap = new HashMapVO();
        groupMap.put("groupId", requestMap.get("groupId"));
        groupMap.put("userId", requestMap.get("userId"));
        groupMap.put("groupPw", requestMap.get("groupPw"));
        groupMap.put("groupNm", requestMap.get("groupNm"));
        groupMap.put("groupLev", Integer.parseInt(requestMap.get("groupLev")));
        groupMap.put("groupLat", requestMap.get("groupLat"));
        groupMap.put("groupLong", requestMap.get("groupLong"));
        groupMap.put("insertIP", requestMap.get("insertIP"));
        groupMap.put("groupRank", requestMap.get("groupRank"));

        // 그룹 생성
        primarySqlSessionTemplate.insert(namespace+".createMapGroup", groupMap);

        // 생성된 그룹에 그룹원정보 삽입
        primarySqlSessionTemplate.insert(namespace+".joinMapGroupUser", groupMap);
    }
}
