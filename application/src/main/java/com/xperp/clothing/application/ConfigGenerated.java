package com.xperp.clothing.application;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 无实际功能，用来注解一些系统配置的，不能被Test Cover的类。来让Jacoco排除这些类的测试覆盖率
 * Jacoco碰到类 有 **Generated注解的时候，就会忽略此类的测试覆盖率统计
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface ConfigGenerated {
}
