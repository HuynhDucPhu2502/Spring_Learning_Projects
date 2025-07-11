package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.role.DefaultRoleRequestDto;
import me.huynhducphu.talent_bridge.dto.response.role.DefaultRoleResponseDto;
import me.huynhducphu.talent_bridge.service.RoleService;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 7/11/2025
 **/
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    @ApiMessage(value = "Tạo chức vụ")
    public DefaultRoleResponseDto saveRole(
            @Valid @RequestBody DefaultRoleRequestDto defaultRoleRequestDto
    ) {
        return roleService.saveRole(defaultRoleRequestDto);
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật chức vụ")
    public DefaultRoleResponseDto updateRole(
            @PathVariable Long id,
            @Valid @RequestBody DefaultRoleRequestDto defaultRoleRequestDto
    ) {
        return roleService.updateRole(id, defaultRoleRequestDto);
    }


}
