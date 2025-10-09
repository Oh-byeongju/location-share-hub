package com.lsh.project.ui.marker;

import com.lsh.framework.data.HashMapResultVO;
import com.lsh.framework.data.HashMapVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerService {
    private final SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "marker";

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

    // 그룹 마커 삭제 메소드
    @Transactional
    public String markerDelete(HashMapVO markerMap) {
        // 존재하지 않는 마커 예외처리
        Integer check = primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerById", markerMap);
        if (check == null) {
            return "실패";
        }
        // 마커 삭제
        primarySqlSessionTemplate.delete(namespace + ".deleteMarker", markerMap);
        return "성공";
    }

    // 마커 상세정보 조회 메소드
    @Transactional
    public HashMapResultVO markerSearch(int markerNo) {
        return primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerAllById", markerNo);
    }

    // 마커 리뷰정보 조회 메소드
    @Transactional
    public List<HashMapResultVO> markerReviewSearch(int markerNo, String userId, String check) {
        // 리뷰 목록 조회
        List<HashMapResultVO> reviews = primarySqlSessionTemplate.selectList(namespace + ".selectMarkerReviews", markerNo);

        // 좋아요 개수 조회
        List<HashMapResultVO> likes = primarySqlSessionTemplate.selectList(namespace + ".selectLikeCountByReview");

        // 좋아요 개수 가공
        HashMapVO like_temp = new HashMapVO();
        for (HashMapResultVO temp : likes) {
            like_temp.put(temp.get("markerReviewNo").toString(), temp.get("likeCount"));
        }

        // 사용자가 좋아요한 리뷰 목록
        List<Integer> favorites = primarySqlSessionTemplate.selectList(namespace+".selectMarkerReviewNosByUser", userId);

        // 마커 목록에 좋아요, 즐겨찾기 값 추가
        for (HashMapResultVO temp : reviews) {
            // 좋아요 개수를 추출 후 삽입
            // 마커 기본키 기준으로 존재하면 값을 그대로 넣어주고 아니면 0을 리턴
            temp.put("likeCount", like_temp.getOrDefault(temp.get("markerReviewNo").toString(), 0));

            if (favorites.contains(temp.get("markerReviewNo"))) {
                temp.put("reviewLike", "y");
            } else {
                temp.put("reviewLike", "n");
            }
        }

        // 공감순을 요청했으면 내림차순으로 정렬
        if (check.equals("공감")) {
            Collections.sort(reviews, new Comparator<HashMap<String, Object>>() {
                @Override
                public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
                    Integer age1 = Integer.valueOf(o1.get("likeCount").toString());
                    Integer age2 = Integer.valueOf(o2.get("likeCount").toString());
                    return age2.compareTo(age1);
                }
            });
        }

        return reviews;
    }

    // 리뷰 작성 메소드
    @Transactional
    public String reviewWrite(HashMapVO reviewMap) {
        // 사용자가 작성한 마커의 리뷰 기록 확인
        // null이면 리뷰 기록이 없는 것, 숫자가 나오면 있는 것
        Integer result = primarySqlSessionTemplate.selectOne(namespace + ".getMapReview", reviewMap);

        // null이 아니면 insert 없이 리턴
        if (result != null) {
            return "실패";
        }

        // 마커 내용 삽입
        primarySqlSessionTemplate.insert(namespace + ".insertMarkerReview", reviewMap);

        return "성공";
    }

    // 리뷰 공감 메소드
    @Transactional
    public String reviewLike(HashMapVO reviewMap) {
        // 존재하지 않는 리뷰 예외처리
        Integer check = primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerReviewNo", reviewMap);
        if (check == null) {
            return "error";
        }

        // 사용자가 요청한 리뷰의 공감 기록 확인
        // null이면 공감 기록이 없는 것, 숫자가 나오면 있는 것
        Integer result = primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerReviewNo2", reviewMap);

        if (result == null) {
            // 리뷰 공감 삽입
            primarySqlSessionTemplate.insert(namespace + ".insertReviewLike", reviewMap);
            return "y";
        } else {
            // 리뷰 공감 제거
            primarySqlSessionTemplate.delete(namespace + ".deleteMarkerReview", reviewMap);
            return "n";
        }
    }

    // 리뷰 삭제 메소드
    @Transactional
    public String reviewDelete(HashMapVO reviewMap) {
        // 존재하지 않는 리뷰 예외처리
        Integer check = primarySqlSessionTemplate.selectOne(namespace + ".selectMarkerReviewNo", reviewMap);
        if (check == null) {
            return "error";
        }

        // 리뷰 삭제
        primarySqlSessionTemplate.delete(namespace + ".deleteMarkerReviewReal", reviewMap);
        return "성공";
    }
}
