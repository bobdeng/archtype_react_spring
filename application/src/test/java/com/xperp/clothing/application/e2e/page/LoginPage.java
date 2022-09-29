package com.xperp.clothing.application.e2e.page;

import com.xperp.clothing.application.WebDriverHandler;
import org.springframework.stereotype.Service;

@Service
public class LoginPage extends E2EPage {
    public LoginPage(WebDriverHandler webDriverHandler) {
        super(webDriverHandler);
    }

    @Override
    public void open() {

    }

    public Boolean isAt() {
        return hasText("登录名");
    }
}
