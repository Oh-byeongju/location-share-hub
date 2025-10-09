package com.lsh.project.commonmodule.menuprogram;

import com.lsh.framework.data.HashMapVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Getter
@Setter
@ToString
public class MenuPgmVo{

    public MenuPgmVo() {
        super();
        pgmDtoArrayList = new ArrayList<>();
    }

    private String compCd;

    private String menuId;

    private String menuNm;

    private String menuImg;

    private ArrayList<HashMapVO> pgmDtoArrayList;

    public void addPgmDto(HashMapVO pgmDto) {
        this.pgmDtoArrayList.add(pgmDto);
    }
}
