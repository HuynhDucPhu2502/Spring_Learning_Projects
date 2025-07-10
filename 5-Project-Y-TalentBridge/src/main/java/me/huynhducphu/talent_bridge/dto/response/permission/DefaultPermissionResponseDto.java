package me.huynhducphu.talent_bridge.dto.response.permission;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/10/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DefaultPermissionResponseDto {

    private Long id;
    private String name;
    private String apiPath;
    private String method;
    private String module;
    private String createdAt;
    private String updatedAt;

}
