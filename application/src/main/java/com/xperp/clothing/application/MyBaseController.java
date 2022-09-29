package com.xperp.clothing.application;

import cn.bobdeng.rbac.security.PermissionDeniedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
@RestControllerAdvice
@Slf4j
@ConfigGenerated
public class MyBaseController {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String onIllegalFields(MethodArgumentNotValidException exception, HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return exception.getBindingResult().getFieldErrors()
                .stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" "));
    }

    @ExceptionHandler(RuntimeException.class)
    public void onException(RuntimeException e, HttpServletResponse response) throws IOException {
        log.warn("", e);
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getOutputStream().write(e.getMessage().getBytes(StandardCharsets.UTF_8));
    }

    @ExceptionHandler(PermissionDeniedException.class)
    public String onPermissionDenied(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return "无权限";
    }
}
