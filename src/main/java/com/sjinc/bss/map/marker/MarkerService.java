package com.sjinc.bss.map.marker;

import com.sjinc.bss.framework.data.HashMapResultVO;
import com.sjinc.bss.framework.data.HashMapVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "marker";

    // 마커 상세정보 조회 메소드
    @Transactional
    public HashMapResultVO markerSearch(int markerNo) {
        return primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerAllById", markerNo);
    }

    // 그룹 마커 즐겨찾기 메소드
    @Transactional
    public String markerBookmark(HashMapVO markerMap) {
        // 존재하지 않는 마커 예외처리
        Integer check = primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerById", markerMap);
        if (check == null) {
            return "error";
        }

        // 사용자가 요청한 마커의 즐겨찾기 기록 확인
        // null이면 즐겨찾기 기록이 없는 것, 숫자가 나오면 있는 것
        Integer result = primarySqlSessionTemplate.selectOne(namespace + ".getMapBookmark", markerMap);

        if (result == null) {
            // 마커 즐찾 삽입
            primarySqlSessionTemplate.insert(namespace + ".insertMapBookmark", markerMap);
            return "y";
        } else {
            // 마커 즐찾 제거
            primarySqlSessionTemplate.delete(namespace + ".deleteMapBookmark", markerMap);
            return "n";
        }
    }
}
