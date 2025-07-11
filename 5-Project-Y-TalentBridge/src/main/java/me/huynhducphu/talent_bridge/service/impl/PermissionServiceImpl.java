package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.permission.DefaultPermissionRequestDto;
import me.huynhducphu.talent_bridge.dto.response.permission.DefaultPermissionResponseDto;
import me.huynhducphu.talent_bridge.model.Permission;
import me.huynhducphu.talent_bridge.repository.PermissionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Admin 7/10/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class PermissionServiceImpl implements me.huynhducphu.talent_bridge.service.PermissionService {

    private final PermissionRepository permissionRepository;

    @Override
    public Page<DefaultPermissionResponseDto> findAllPermission(
            Specification<Permission> spec,
            Pageable pageable
    ) {
        return permissionRepository
                .findAll(spec, pageable)
                .map(this::mapToDefaultResponseDto);
    }


    @Override
    public DefaultPermissionResponseDto savePermission(
            DefaultPermissionRequestDto defaultPermissionRequestDto
    ) {
        Permission permission = new Permission(
                null,
                defaultPermissionRequestDto.getName(),
                defaultPermissionRequestDto.getApiPath(),
                defaultPermissionRequestDto.getMethod(),
                defaultPermissionRequestDto.getModule()
        );

        Permission savedPermission = permissionRepository.save(permission);
        return mapToDefaultResponseDto(savedPermission);
    }

    @Override
    public DefaultPermissionResponseDto updatePermission(
            Long id,
            DefaultPermissionRequestDto defaultPermissionRequestDto
    ) {
        Permission permission = permissionRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy quyền hạn này"));

        permission.setName(defaultPermissionRequestDto.getName());
        permission.setApiPath(defaultPermissionRequestDto.getApiPath());
        permission.setMethod(defaultPermissionRequestDto.getMethod());
        permission.setModule(defaultPermissionRequestDto.getModule());

        Permission savedPermission = permissionRepository.save(permission);
        return mapToDefaultResponseDto(savedPermission);
    }

    @Override
    public DefaultPermissionResponseDto deletePermission(Long id) {
        Permission permission = permissionRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy quyền hạn này"));

        permissionRepository.delete(permission);
        return mapToDefaultResponseDto(permission);
    }

    private DefaultPermissionResponseDto mapToDefaultResponseDto(Permission permission) {

        DefaultPermissionResponseDto res = new DefaultPermissionResponseDto(
                permission.getId(),
                permission.getName(),
                permission.getApiPath(),
                permission.getMethod(),
                permission.getModule(),
                permission.getCreatedAt().toString(),
                permission.getUpdatedAt().toString()
        );

        return res;
    }

}
