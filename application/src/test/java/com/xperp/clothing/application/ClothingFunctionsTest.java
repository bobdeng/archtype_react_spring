package com.xperp.clothing.application;

import cn.bobdeng.rbac.domain.function.Function;
import cn.bobdeng.rbac.server.impl.function.ExternalFunctionReader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ClothingFunctionsTest extends IntegrationTest {
    @Autowired
    ExternalFunctionReader externalFunctionReader;

    @Test
    public void should_not_empty_when_read_functions() {
        List<Function> functions = externalFunctionReader.read();
        assertTrue(functions.size() > 0);
    }
}