package com.xperp.clothing.implemations;

import com.xperp.clothing.Paged;
import org.springframework.data.domain.Page;

public class PagedConvert<T> {

    private final Page<T> data;

    public PagedConvert(Page<T> data) {
        this.data = data;
    }

    public Paged<T> convert(){
        return Paged.<T>builder()
                .currentPage(data.getNumber())
                .totalElements(data.getTotalElements())
                .totalPage(data.getTotalPages())
                .pageSize(data.getSize())
                .list(data.toList())
                .build();
    }

}
