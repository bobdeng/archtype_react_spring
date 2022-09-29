package com.xperp.clothing;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.function.Function;

@Data
@Builder
public class Paged<T> {
    private List<T> list;
    private Long totalElements;
    private int totalPage;
    private int currentPage;
    private int pageSize;

    public <R> Paged<R> map(Function<T, R> converter) {
        return Paged.<R>builder()
                .totalPage(totalPage).
                totalElements(totalElements).pageSize(pageSize)
                .currentPage(currentPage)
                .list(list.stream().map(converter).toList())
                .build();
    }
}
