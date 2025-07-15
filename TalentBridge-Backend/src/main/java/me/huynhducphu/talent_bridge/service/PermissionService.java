package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.permission.DefaultPermissionRequestDto;
import me.huynhducphu.talent_bridge.dto.response.permission.DefaultPermissionResponseDto;
import me.huynhducphu.talent_bridge.model.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 7/10/2025
 **/
public interface PermissionService {
    Page<DefaultPermissionResponseDto> findAllPermission(
            Specification<Permission> spec,
            Pageable pageable
    );

    DefaultPermissionResponseDto savePermission(
            DefaultPermissionRequestDto defaultPermissionRequestDto
    );

    DefaultPermissionResponseDto updatePermission(
            Long id,
            DefaultPermissionRequestDto defaultPermissionRequestDto
    );

    DefaultPermissionResponseDto deletePermission(Long id);
}
