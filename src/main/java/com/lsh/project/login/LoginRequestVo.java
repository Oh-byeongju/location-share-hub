package com.lsh.project.login;

import com.lsh.framework.model.base.BaseRequestVo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequestVo extends BaseRequestVo {

    private String userId;
    private String passWd;

    private String saveID;

}
