package com.xperp.clothing.application;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MyBaseControllerTest extends IntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    public void should_response_error_when_exception() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/should_throw"))
                .andExpect(status().is4xxClientError())
                .andReturn();
        assertEquals("这是一个错误", mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
    }
}