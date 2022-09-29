package com.xperp.clothing.application.e2e.page;

import com.xperp.clothing.application.WebDriverHandler;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.*;

public abstract class E2EPage {
    protected WebDriverHandler webDriverHandler;

    public E2EPage(WebDriverHandler webDriverHandler) {
        this.webDriverHandler = webDriverHandler;
    }

    public abstract void open();

    public void shouldHasText(String text) {
        assertTrue(containsText(text));
    }

    public boolean containsText(String text) {
        return webDriverHandler.getWebDriver().getPageSource().contains(text);
    }

    public void setCookie(String name, String value) {
        webDriverHandler.addCookie(name, value);
    }

    public void titleShouldBe(String title) {
        assertEquals(title, webDriverHandler.getWebDriver().getTitle());
    }

    public void shouldHasButton(String name) {
        WebElement element = findButton(name);
        if (element == null) {
            System.out.println(webDriverHandler.getWebDriver().getPageSource());
        }
        assertNotNull(element);
    }

    public boolean hasButton(String name) {
        WebElement element = findButton(name);
        return element != null;
    }

    protected WebElement findButton(String name) {
        waitUntil(() -> hasText(name), 1000);
        return webDriverHandler.getWebDriver().findElement(By.xpath("//button[normalize-space()='" + name + "']"));
    }

    protected WebElement findByText(String content) {
        return getWebDriver().findElement(By.xpath("//*[text()='" + content + "']"));
    }

    public void waitUntil(Supplier<Boolean> check, int time) {
        long begin = System.currentTimeMillis();
        while (System.currentTimeMillis() - begin < time) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (check.get())
                return;
        }
        fail();
    }

    public WebDriver getWebDriver() {
        return webDriverHandler.getWebDriver();
    }

    public WebElement getElementByPlaceHolder(String placeholder) {
        return getWebDriver().findElement(By.xpath("//input[@placeholder='" + placeholder + "']"));
    }

    public Boolean hasText(String id) {
        return getWebDriver().getPageSource().contains(id);
    }
}
