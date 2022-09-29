package com.xperp.clothing;

import lombok.Getter;

@Getter
public class Page {
    private int page;
    private int size;

    public Page(int page, int size) {
        this.page = page;
        this.size = size;
    }

}
