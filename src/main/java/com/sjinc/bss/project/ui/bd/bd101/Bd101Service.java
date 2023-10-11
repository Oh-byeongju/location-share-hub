package com.sjinc.bss.project.ui.bd.bd101;

import com.sjinc.bss.framework.data.HashMapStringVO;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;


@Slf4j
@Service
public class Bd101Service {

    private SqlSessionTemplate primarySqlSessionTemplate;
    private final static String namespace = "bd101";

    public Bd101Service(SqlSessionTemplate primarySqlSessionTemplate) {
        this.primarySqlSessionTemplate = primarySqlSessionTemplate;
    }

    /**
     * 공지사항 삭제
     * @param parm
     * @return
     * @throws Exception
     */
    @Transactional(value = "txManagerPrimary")
    public int delete(HashMapStringVO parm) throws Exception {

        int result = 0;

        result += primarySqlSessionTemplate.delete(namespace+".deleteByPrimaryKey",parm);
        if (!StringUtils.isEmpty(parm.get("atfiId"))) {
            result += primarySqlSessionTemplate.delete("common.deleteAttach", parm);
        }

        return result;
    }
}
