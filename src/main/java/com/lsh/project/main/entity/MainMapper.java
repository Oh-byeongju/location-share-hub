package com.lsh.project.main.entity;

import com.lsh.framework.db.PrimaryConnectMapper;
import com.lsh.project.main.MainMessageRequestVo;

import java.util.List;

/**
 * Main
 */
@PrimaryConnectMapper
public interface MainMapper {

    List<MainMessageDto> selectMessage(MainMessageRequestVo parm);

}