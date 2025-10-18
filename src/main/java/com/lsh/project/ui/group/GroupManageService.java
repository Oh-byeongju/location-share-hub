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
public class GroupManageService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "groupManage";

    // 그룹 검색 메소드
    @Transactional(readOnly = true)
    public List<HashMapResultVO> groupSearch(HashMapStringVO requestMap) {
        HashMapVO groupMap = new HashMapVO();
        groupMap.put("userId", requestMap.get("userId"));
        groupMap.put("groupId", requestMap.get("pgminfo"));

        // 그룹 기본정보 검색 후 리턴
        return primarySqlSessionTemplate.selectList(namespace+".selectByLikeId", groupMap);
    }

    @Transactional
    public String groupLeave(HashMapStringVO requestMap) {
        primarySqlSessionTemplate.delete(namespace + ".deleteReviewLikeByGroupAndUser", requestMap);
        primarySqlSessionTemplate.delete(namespace + ".deleteMarkerReviewByGroupAndUser", requestMap);
        primarySqlSessionTemplate.delete(namespace + ".deleteBookmarkByGroupAndUser", requestMap);
        primarySqlSessionTemplate.delete(namespace + ".deleteMarkerByGroupAndUser", requestMap);
        primarySqlSessionTemplate.delete(namespace + ".deleteGroupUserByGroupAndUser", requestMap);

        return "성공";
    }

    @Transactional
    public String groupDelete(HashMapStringVO requestMap) {
        primarySqlSessionTemplate.delete(namespace + ".deleteGroupByGroup", requestMap);

        return "성공";
    }

    @Transactional(readOnly = true)
    // 그룹 정보 검색
    public HashMapResultVO groupInfo(String groupId) {
        return primarySqlSessionTemplate.selectOne(namespace+".selectGroupByGroup", groupId);
    }

    // 그룹 수정 메소드
    @Transactional
    public void groupUpdate(HashMapStringVO requestMap) {
        // 쿼리문에 Integer가 있어서 형변환 시킴
        HashMapVO groupMap = new HashMapVO();
        groupMap.put("groupId", requestMap.get("groupId"));
        groupMap.put("userId", requestMap.get("userId"));
        groupMap.put("groupPw", requestMap.get("groupPw"));
        groupMap.put("groupNm", requestMap.get("groupNm"));
        groupMap.put("groupLev", Integer.parseInt(requestMap.get("groupLev")));
        groupMap.put("groupLat", requestMap.get("groupLat"));
        groupMap.put("groupLong", requestMap.get("groupLong"));
        groupMap.put("updateIP", requestMap.get("updateIP"));

        // 그룹 생성
        primarySqlSessionTemplate.update(namespace+".updateMapGroup", groupMap);
    }

    // 그룹원 검색 메소드
    @Transactional(readOnly = true)
    public List<HashMapResultVO> groupUserSearch(HashMapStringVO requestMap) {
        HashMapVO groupMap = new HashMapVO();
        groupMap.put("groupId", requestMap.get("groupId"));

        // 그룹원 기본정보 검색 후 리턴
        return primarySqlSessionTemplate.selectList(namespace+".groupUserSearch", groupMap);
    }
}
