package me.huynhducphu.talent_bridge.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Admin 7/17/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserSessionResponseDto {
    private String email;
    private String name;
    private Long id;
    private String companyId;
    private String role;
    private List<String> permissions;
    private String logoUrl;
}
