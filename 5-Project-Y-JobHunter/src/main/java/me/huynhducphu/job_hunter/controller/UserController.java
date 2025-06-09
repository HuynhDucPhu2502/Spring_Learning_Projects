package me.huynhducphu.job_hunter.controller;

/**
 * Admin 6/7/2025
 **/

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.job_hunter.dto.request.CreateUserRequestDto;
import me.huynhducphu.job_hunter.model.ApiResponse;
import me.huynhducphu.job_hunter.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> saveUser(@Valid @RequestBody CreateUserRequestDto createUserRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        "Tạo tài khoản thành công",
                        userService.saveUser(createUserRequestDto)
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> findAllUsers() {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy toàn bộ danh sách người dùng",
                        userService.findAllUser()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy toàn bộ danh sách người dùng",
                        userService.findUserById(id)
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody CreateUserRequestDto createUserRequestDto
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy toàn bộ danh sách người dùng",
                        userService.updateUser(createUserRequestDto, id)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUserById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy toàn bộ danh sách người dùng",
                        userService.deleteUserById(id)
                )
        );
    }


}
