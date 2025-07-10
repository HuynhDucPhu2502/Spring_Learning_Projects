package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.permission.DefaultPermissionRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.permission.DefaultPermissionResponseDto;
import me.huynhducphu.talent_bridge.model.Permission;
import me.huynhducphu.talent_bridge.repository.PermissionRepository;
import me.huynhducphu.talent_bridge.service.PermissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Admin 7/10/2025
 **/
@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionService permissionService;

    @GetMapping
    @ApiMessage("Lấy danh sách quyền hạn")
    public ResponseEntity<?> findAllPermissions(
            @Filter Specification<Permission> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<DefaultPermissionResponseDto> page = permissionService.findAllPermission(spec, pageable);

        PageResponseDto<DefaultPermissionResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @PostMapping
    @ApiMessage(value = "Tạo quyền hạn")
    public DefaultPermissionResponseDto savePermission(
            @Valid @RequestBody DefaultPermissionRequestDto defaultPermissionRequestDto
    ) {
        return permissionService.savePermission(defaultPermissionRequestDto);
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật quyền hạn")
    public DefaultPermissionResponseDto updatePermission(
            @Valid @RequestBody DefaultPermissionRequestDto defaultPermissionRequestDto,
            @PathVariable Long id
    ) {
        return permissionService.updatePermission(id, defaultPermissionRequestDto);
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa quyền hạn")
    public DefaultPermissionResponseDto deletePermission(
            @PathVariable Long id
    ) {
        return permissionService.deletePermission(id);
    }
}
