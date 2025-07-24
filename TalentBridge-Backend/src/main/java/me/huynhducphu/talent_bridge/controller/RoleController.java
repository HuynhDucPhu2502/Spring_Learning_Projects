package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.role.DefaultRoleRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.role.DefaultRoleResponseDto;
import me.huynhducphu.talent_bridge.model.Role;
import me.huynhducphu.talent_bridge.service.RoleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 7/11/2025
 **/
@Tag(name = "Role")
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    @ApiMessage(value = "Tạo Role")
    @PreAuthorize("hasAuthority('POST /roles')")
    @Operation(
            summary = "Tạo Role",
            description = "Yêu cầu quyền: <b>POST /roles</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultRoleResponseDto> saveRole(
            @Valid @RequestBody DefaultRoleRequestDto defaultRoleRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(roleService.saveRole(defaultRoleRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách Role")
    @PreAuthorize("hasAuthority('GET /roles')")
    @Operation(
            summary = "Lấy danh sách Role",
            description = "Yêu cầu quyền: <b>GET /roles</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<PageResponseDto<DefaultRoleResponseDto>> findAllRoles(
            @Filter Specification<Role> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<DefaultRoleResponseDto> page = roleService.findAllRoles(spec, pageable);

        PageResponseDto<DefaultRoleResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật Role")
    @PreAuthorize("hasAuthority('PUT /roles/{id}')")
    @Operation(
            summary = "Câp nhật Role",
            description = "Yêu cầu quyền: <b>PUT /roles/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultRoleResponseDto> updateRoleById(
            @PathVariable Long id,
            @Valid @RequestBody DefaultRoleRequestDto defaultRoleRequestDto
    ) {
        return ResponseEntity.ok(roleService.updateRole(id, defaultRoleRequestDto));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa Role theo id")
    @PreAuthorize("hasAuthority('DELETE /roles/{id}')")
    @Operation(
            summary = "Xóa Role theo id",
            description = "Yêu cầu quyền: <b>DELETE /roles/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultRoleResponseDto> deleteRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.deleteRoleById(id));
    }


}
