package com.xperp.clothing.application;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@ConfigGenerated
public class ConsoleController {
    @GetMapping("/*")
    public String home() {
        return "index";
    }
}
