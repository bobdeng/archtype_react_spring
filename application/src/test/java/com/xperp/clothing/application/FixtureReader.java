package com.xperp.clothing.application;

import com.google.common.io.Resources;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class FixtureReader {
    public static String read(String path) throws IOException {
        return new String(Resources.asByteSource(Resources.getResource(path)).read(), StandardCharsets.UTF_8);
    }

   
}
