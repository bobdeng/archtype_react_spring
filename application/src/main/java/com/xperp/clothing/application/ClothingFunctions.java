package com.xperp.clothing.application;

import cn.bobdeng.rbac.domain.function.Function;
import cn.bobdeng.rbac.server.impl.function.ExternalFunctionReader;
import cn.bobdeng.rbac.utils.ResourceReader;
import com.google.gson.Gson;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
@Primary
@ConfigGenerated
public class ClothingFunctions implements ExternalFunctionReader {
    private final ResourceReader resourceReader;

    public ClothingFunctions(ResourceReader resourceReader) {
        this.resourceReader = resourceReader;
    }

    @Override
    public List<Function> read() {
        try {
            String content = resourceReader.read("functions.json");
            Function[] functions = new Gson().fromJson(content, Function[].class);
            return Arrays.asList(functions);
        } catch (IOException e) {

        }
        return null;
    }
}
