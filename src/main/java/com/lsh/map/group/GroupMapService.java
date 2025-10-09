package com.lsh.map.group;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapStringVO;
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

    // 그룹 마커목록 조회 메소드
    @Transactional
    public List<HashMapResultVO> groupMarkersSearch(String userId, String groupId) {
        // 그룹내 마커목록 조회
        List<HashMapResultVO> markerVO =  primarySqlSessionTemplate.selectList(namespace+".selectMarkersByGId", groupId);

        // 사용자가 즐겨찾기한 마커 목록
        List<Integer> favorites = primarySqlSessionTemplate.selectList(namespace+".selectFavoriteMarkerNo", userId);

        // 마커 목록에 사용자의 즐겨찾기 기록 추가
        for (HashMapResultVO temp : markerVO) {
            if (favorites.contains(temp.get("markerNo"))) {
                temp.put("markerBookmark", "y");
            } else {
                temp.put("markerBookmark", "n");
            }
        }

        return markerVO;
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

    // 마커생성 메소드
    @Transactional
    public HashMapResultVO markerCreate(HashMapResultVO requestMap) {
        // 그룹원 등급조회를 위한 파라미터 생성
        HashMapStringVO parameter = new HashMapStringVO();
        parameter.put("groupId", (String) requestMap.get("groupId"));
        parameter.put("userId", (String) requestMap.get("userId"));

        // 그룹원 등급 확인
        String rank = primarySqlSessionTemplate.selectOne(namespace+".selectGroupUserRankCd", parameter);

        // 마커 생성을 못하는 등급일경우(일반, 차단)
        if (rank.equals("normal") || rank.equals("blocked")) {
            // 마커 생성 불가시 null map 리턴
            return new HashMapResultVO();
        }
        
        // 마커생성 후 생성된 마커 기본키 추출
        primarySqlSessionTemplate.insert(namespace+".insertMapMarker", requestMap);

        // 방금 생성한 마커의 정보 조회
        return primarySqlSessionTemplate.selectOne(namespace+".selectMarkerByGId", requestMap.get("markerNo"));
    }
}
