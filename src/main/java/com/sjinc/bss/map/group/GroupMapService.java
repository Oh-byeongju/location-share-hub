package com.sjinc.bss.map.group;

import com.sjinc.bss.framework.data.HashMapResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupMapService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "groupMap";

    // 그룹 정보 조회 메소드
    @Transactional
    public HashMapResultVO groupInfoSearch(String groupId) {
        // 그룹 정보 검색 후 리턴
        return primarySqlSessionTemplate.selectOne(namespace+".selectGroupByGId", groupId);
    }

    @Transactional
    public HashMapResultVO groupDetailInfoSearch(String groupId) {
        // 그룹에 대한 상세정보 조회
        HashMapResultVO resultVO = primarySqlSessionTemplate.selectOne(namespace+".selectGroupDetailByGId", groupId);

        // 가입자 수, 마커 수 조회 후 삽입
        resultVO.put("userCount", primarySqlSessionTemplate.selectOne(namespace+".getGroupUserCountByGroupId", groupId));
        resultVO.put("markerCount", primarySqlSessionTemplate.selectOne(namespace+".getMarkerCountByGroupId", groupId));

        return resultVO;
    }
}
