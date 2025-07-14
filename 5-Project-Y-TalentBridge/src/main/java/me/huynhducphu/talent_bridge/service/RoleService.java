package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.role.DefaultRoleRequestDto;
import me.huynhducphu.talent_bridge.dto.response.role.DefaultRoleResponseDto;
import me.huynhducphu.talent_bridge.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 7/11/2025
 **/
public interface RoleService {
    DefaultRoleResponseDto saveRole(DefaultRoleRequestDto defaultRoleRequestDto);

    DefaultRoleResponseDto updateRole(
            Long id,
            DefaultRoleRequestDto defaultRoleRequestDto
    );

    Page<DefaultRoleResponseDto> findAllRoles(
            Specification<Role> spec,
            Pageable pageable);
}
