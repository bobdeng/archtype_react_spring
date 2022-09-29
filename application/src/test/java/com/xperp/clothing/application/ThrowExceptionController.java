package com.xperp.clothing.application;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThrowExceptionController {
    @GetMapping("/should_throw")
    public String shouldThrow(){
        throw new RuntimeException("这是一个错误");
    }
}
