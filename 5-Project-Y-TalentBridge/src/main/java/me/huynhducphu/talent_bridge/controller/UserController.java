package me.huynhducphu.talent_bridge.controller;

/**
 * Admin 6/7/2025
 **/

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.user.UserCreateRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserUpdateRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "USER")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ApiMessage(value = "Tạo User")
    @PreAuthorize("hasAuthority('POST /users')")
    @Operation(
            summary = "Tạo User",
            description = "Yêu cầu quyền: <b>POST /users</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserCreateRequestDto userCreateRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.saveUser(userCreateRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách User")
    @PreAuthorize("hasAuthority('GET /users')")
    @Operation(
            summary = "Lấy danh sách User",
            description = "Yêu cầu quyền: <b>GET /users</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findAllUsers(
            @Filter Specification<User> spec,
            Pageable pageable
    ) {


        Page<UserResponseDto> page = userService.findAllUser(spec, pageable);

        PageResponseDto<UserResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    @ApiMessage(value = "Tìm User dùng theo id")
    @PreAuthorize("hasAuthority('GET /users/{id}')")
    @Operation(
            summary = "Tìm User theo id",
            description = "Yêu cầu quyền: <b>GET /users/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PutMapping
    @ApiMessage(value = "Cập nhật User")
    @PreAuthorize("hasAuthority('PUT /users')")
    @Operation(
            summary = "Cập nhật User",
            description = "Yêu cầu quyền: <b>PUT /users</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateUser(
            @Valid @RequestBody UserUpdateRequestDto userUpdateRequestDto
    ) {
        return ResponseEntity.ok(userService.updateUser(userUpdateRequestDto));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa User theo id")
    @PreAuthorize("hasAuthority('DELETE /users/{id}')")
    @Operation(
            summary = "Xóa User theo id",
            description = "Yêu cầu quyền: <b>DELETE /users/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUserById(id));
    }


}
