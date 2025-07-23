package me.huynhducphu.talent_bridge.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/23/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecruiterResponseDto {
    private Long id;
    private String name;
    private String email;
    private boolean owner;
}
