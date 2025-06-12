package me.huynhducphu.talent_bridge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Admin 6/12/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageResponseDto<T> {

    private List<T> content;

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

}
