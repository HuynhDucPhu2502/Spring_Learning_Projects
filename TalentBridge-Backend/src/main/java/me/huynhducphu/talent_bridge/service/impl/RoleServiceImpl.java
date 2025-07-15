package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.role.DefaultRoleRequestDto;
import me.huynhducphu.talent_bridge.dto.response.role.DefaultRoleResponseDto;
import me.huynhducphu.talent_bridge.model.Permission;
import me.huynhducphu.talent_bridge.model.Role;
import me.huynhducphu.talent_bridge.repository.PermissionRepository;
import me.huynhducphu.talent_bridge.repository.RoleRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Admin 7/11/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements me.huynhducphu.talent_bridge.service.RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;

    @Override
    public DefaultRoleResponseDto saveRole(DefaultRoleRequestDto defaultRoleRequestDto) {
        Role role = new Role(
                defaultRoleRequestDto.getName(),
                defaultRoleRequestDto.getDescription()
        );

        Set<Permission> permissions = null;
        if (defaultRoleRequestDto.getPermissions() != null) {
            Set<Long> permissionIds = defaultRoleRequestDto
                    .getPermissions()
                    .stream()
                    .map(DefaultRoleRequestDto.PermissionId::getId)
                    .collect(Collectors.toSet());
            permissions = new HashSet<>(permissionRepository.findAllById(permissionIds));

            if (permissions.size() != defaultRoleRequestDto.getPermissions().size())
                throw new EntityNotFoundException("Quyền hạn không tồn tại");
        }

        role.setPermissions(permissions);

        Role savedRole = roleRepository.save(role);
        return mapToDefaultRoleResponseDto(savedRole);
    }

    @Override
    public DefaultRoleResponseDto updateRole(
            Long id,
            DefaultRoleRequestDto defaultRoleRequestDto
    ) {
        Role role = roleRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chức vụ không tồn tại"));

        role.setName(defaultRoleRequestDto.getName());
        role.setDescription(defaultRoleRequestDto.getDescription());
        role.setActive(defaultRoleRequestDto.isActive());

        if (defaultRoleRequestDto.getPermissions() != null) {
            Set<Long> requestedPermissionIds = defaultRoleRequestDto.getPermissions().stream()
                    .map(DefaultRoleRequestDto.PermissionId::getId)
                    .collect(Collectors.toSet());

            Set<Permission> currentPermissions = new HashSet<>(role.getPermissions());
            currentPermissions.removeIf(x -> !currentPermissions.contains(x.getId()));

            Set<Long> currentPermissionIds = currentPermissions.stream()
                    .map(Permission::getId)
                    .collect(Collectors.toSet());

            Set<Long> newPermissionIdsToAdd = new HashSet<>(requestedPermissionIds);
            requestedPermissionIds.removeAll(currentPermissionIds);

            if (!newPermissionIdsToAdd.isEmpty()) {
                List<Permission> newPermissions = permissionRepository.findAllById(newPermissionIdsToAdd);
                currentPermissions.addAll(newPermissions);
            }

            role.setPermissions(currentPermissions);
        }

        Role updatedRole = roleRepository.saveAndFlush(role);

        return mapToDefaultRoleResponseDto(updatedRole);
    }

    @Override
    public Page<DefaultRoleResponseDto> findAllRoles(
            Specification<Role> spec,
            Pageable pageable) {
        return roleRepository
                .findAll(spec, pageable)
                .map(this::mapToDefaultRoleResponseDto);
    }

    @Override
    public DefaultRoleResponseDto deleteRoleById(Long id) {
        Role role = roleRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chức vụ không tồn tại"));

        DefaultRoleResponseDto defaultRoleResponseDto = mapToDefaultRoleResponseDto(role);

        if (role.getPermissions() != null) role.getPermissions().clear();
        userRepository.detachUsersFromRole(role.getId());

        roleRepository.delete(role);
        return defaultRoleResponseDto;
    }

    private DefaultRoleResponseDto mapToDefaultRoleResponseDto(Role role) {
        DefaultRoleResponseDto res = new DefaultRoleResponseDto(
                role.getId(),
                role.isActive(),
                role.getName(),
                role.getCreatedAt().toString(),
                role.getUpdatedAt().toString()
        );

        List<DefaultRoleResponseDto.Permission> permissions = role.getPermissions()
                .stream()
                .map(p -> new DefaultRoleResponseDto.Permission(
                        p.getId(),
                        p.getName(),
                        p.getApiPath(),
                        p.getMethod(),
                        p.getModule()
                ))
                .toList();
        res.setPermissions(permissions);

        return res;
    }


}
