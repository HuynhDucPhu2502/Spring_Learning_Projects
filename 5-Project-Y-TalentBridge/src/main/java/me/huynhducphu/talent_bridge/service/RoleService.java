package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.role.DefaultRoleRequestDto;
import me.huynhducphu.talent_bridge.dto.response.role.DefaultRoleResponseDto;

/**
 * Admin 7/11/2025
 **/
public interface RoleService {
    DefaultRoleResponseDto saveRole(DefaultRoleRequestDto defaultRoleRequestDto);

    DefaultRoleResponseDto updateRole(
            Long id,
            DefaultRoleRequestDto defaultRoleRequestDto
    );
}
