package me.huynhducphu.spring_jpa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 5/30/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TodoDto {

    private String title;
    private String description;

}
