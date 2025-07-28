package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.user.SelfUserUpdatePasswordRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.SelfUserUpdateProfileRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserCreateRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserUpdateRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.DefaultUserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "User")
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
            description = "Yêu cầu quyền: <b>POST /users</b>"
    )
    public ResponseEntity<DefaultUserResponseDto> saveUser(
            @Valid @RequestBody UserCreateRequestDto userCreateRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.saveUser(userCreateRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách User")
    @PreAuthorize("hasAuthority('GET /users')")
    @Operation(
            summary = "Lấy danh sách User",
            description = "Yêu cầu quyền: <b>GET /users</b>"
    )
    public ResponseEntity<PageResponseDto<DefaultUserResponseDto>> findAllUsers(
            @Filter Specification<User> spec,
            Pageable pageable
    ) {


        Page<DefaultUserResponseDto> page = userService.findAllUser(spec, pageable);

        PageResponseDto<DefaultUserResponseDto> res = new PageResponseDto<>(
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
            description = "Yêu cầu quyền: <b>GET /users/{id}</b>"
    )
    public ResponseEntity<DefaultUserResponseDto> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PutMapping
    @ApiMessage(value = "Cập nhật User")
    @PreAuthorize("hasAuthority('PUT /users')")
    @Operation(
            summary = "Cập nhật User",
            description = "Yêu cầu quyền: <b>PUT /users</b>"
    )
    public ResponseEntity<DefaultUserResponseDto> updateUser(
            @Valid @RequestBody UserUpdateRequestDto userUpdateRequestDto
    ) {
        return ResponseEntity.ok(userService.updateUser(userUpdateRequestDto));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa User theo id")
    @PreAuthorize("hasAuthority('DELETE /users/{id}')")
    @Operation(
            summary = "Xóa User theo id",
            description = "Yêu cầu quyền: <b>DELETE /users/{id}</b>"
    )
    public ResponseEntity<DefaultUserResponseDto> deleteUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUserById(id));
    }

    @PostMapping("/me/update-profile")
    @ApiMessage(value = "Cập nhật Profile của người dùng hiện tại")
    @Operation(summary = "Cập nhật Profile của người dùng hiện tại")
    public ResponseEntity<DefaultUserResponseDto> updateSelfUserProfile(
            @Valid @RequestBody SelfUserUpdateProfileRequestDto selfUserUpdateProfileRequestDto
    ) {
        return ResponseEntity.ok(userService.updateSelfUserProfile(selfUserUpdateProfileRequestDto));
    }

    @PostMapping("/me/update-password")
    @ApiMessage(value = "Cập nhật Password của người dùng hiện tại")
    @Operation(summary = "Cập nhật Password của người dùng hiện tại")
    public ResponseEntity<DefaultUserResponseDto> updateSelfUserPassword(
            @Valid @RequestBody SelfUserUpdatePasswordRequestDto selfUserUpdatePasswordRequestDto
    ) {
        return ResponseEntity.ok(userService.updateSelfUserPassword(selfUserUpdatePasswordRequestDto));
    }

    @PostMapping("/me/upload-avatar")
    @ApiMessage(value = "Cập nhật Avatar của người dùng hiện tại")
    @Operation(summary = "Cập nhật Avatar của người dùng hiện tại")
    public void updateSelfUserAvatar(
            @RequestParam("avatar") MultipartFile avatarFile
    ) {
        userService.updateSelfUserAvatar(avatarFile);
    }


}
