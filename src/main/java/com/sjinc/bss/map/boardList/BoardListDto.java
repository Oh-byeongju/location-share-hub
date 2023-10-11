package com.sjinc.bss.map.boardList;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardListDto {
    private Integer post_no;
    private String content;
    
    @Builder
    public BoardListDto(Integer post_no, String content) {
    	this.post_no = post_no;
    	this.content = content;
    }
}