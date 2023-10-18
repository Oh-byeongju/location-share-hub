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
public class GroupMapService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "groupMap";

    // 그룹 지도정보 조회 메소드
    @Transactional
    public HashMapResultVO groupInfoSearch(String userId, String groupId) {
        // 그룹 정보 검색
        HashMapResultVO resultVO = primarySqlSessionTemplate.selectOne(namespace+".selectGroupByGId", groupId);

        // 그룹원 등급조회를 위한 파라미터 생성
        HashMapStringVO parameter = new HashMapStringVO();
        parameter.put("groupId", groupId);
        parameter.put("userId", userId);

        // 그룹원 등급 검색 후 map에 삽입
        String rank = primarySqlSessionTemplate.selectOne(namespace+".selectGroupUserRankCd", parameter);
        resultVO.put("groupUserRankCd", rank);

        return resultVO;
    }

    // 그룹 상세정보 조회 메소드
    @Transactional
    public HashMapResultVO groupDetailInfoSearch(String groupId) {
        // 그룹에 대한 상세정보 조회
        HashMapResultVO resultVO = primarySqlSessionTemplate.selectOne(namespace+".selectGroupDetailByGId", groupId);

        // 가입자 수, 마커 수 조회 후 삽입
        resultVO.put("userCount", primarySqlSessionTemplate.selectOne(namespace+".getGroupUserCountByGroupId", groupId));
        resultVO.put("markerCount", primarySqlSessionTemplate.selectOne(namespace+".getMarkerCountByGroupId", groupId));

        return resultVO;
    }

    // 마커 분류 조회 메소드
    @Transactional
    public List<HashMapResultVO> markerCategoriesSearch() {
        return primarySqlSessionTemplate.selectList(namespace+".getMarkerCategories");
    }
}
