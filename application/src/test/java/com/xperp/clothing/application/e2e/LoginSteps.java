package com.xperp.clothing.application.e2e;

import cn.bobdeng.rbac.domain.rbac.User;
import cn.bobdeng.rbac.security.SessionStore;
import com.xperp.clothing.application.Application;
import com.xperp.clothing.application.e2e.page.ConsolePage;
import com.xperp.clothing.application.e2e.page.LoginPage;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@ActiveProfiles(profiles = "ac")
@ContextConfiguration(classes = {Application.class}, loader = SpringBootContextLoader.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@CucumberContextConfiguration
public class LoginSteps {
    @Autowired
    TenantService tenantService;
    @Autowired
    ConsolePage consolePage;
    @Autowired
    SessionStore sessionStore;
    @Autowired
    LoginPage loginPage;

    @Before("@login")
    public void 以登录() {
        User user = tenantService.userByLoginName("张三");
        sessionStore.setTenant(user.tenant());
        consolePage.open();
        consolePage.loginWith(user);
    }

    @Given("没有登录")
    public void 没有登录() {
        consolePage.open();
        consolePage.logout();
    }

    @Then("看到登录页面")
    public void 看到登录页面() {
        loginPage.waitUntil(() -> loginPage.isAt(), 1000);
    }
}
