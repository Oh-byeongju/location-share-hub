//package com.sjinc.bss.map.boardList;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class BoardListService {
//    private final BoardListDao boardListDao;
//
//    public List<BoardListDto> getData() {
//        // 조회
//        List<BoardListDto> boardListDtos = boardListDao.getData();
//
//        // hashmap으로만 받아지는데 이게 최선인가 싶음
//        System.out.println(boardListDtos.get(0));
//
//        // 리턴
//        return boardListDtos;
//    }
//}
//
////집에서는 DB 접근 금지