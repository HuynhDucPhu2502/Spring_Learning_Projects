package me.huynhducphu.talent_bridge.dto.response.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Admin 7/11/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DefaultRoleResponseDto {

    private Long id;
    private String name;
    private boolean active;
    private String createdAt;
    private String updatedAt;
    private List<DefaultRoleResponseDto.Permission> permissions;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Permission {
        private Long id;
        private String name;
        private String apiPath;
        private String method;
        private String module;
    }

    public DefaultRoleResponseDto(Long id, boolean active, String name, String createdAt, String updatedAt) {
        this.id = id;
        this.active = active;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
