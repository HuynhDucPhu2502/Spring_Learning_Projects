package me.huynhducphu.job_hunter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/7/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDto {

    private Long id;
    private String name;
    private String email;
}
