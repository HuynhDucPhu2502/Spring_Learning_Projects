package me.huynhducphu.talent_bridge.controller;

/**
 * Admin 6/7/2025
 **/

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.UserRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.model.ApiResponse;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ApiMessage(value = "Tạo tài khoản")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.saveUser(userRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách người dùng")
    public ResponseEntity<?> findAllUsers(
            @Filter Specification<User> spec,
            Pageable pageable
    ) {


        Page<User> page = userService.findAllUser(spec, pageable);

        PageResponseDto<User> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy người dùng theo mã")
    public ResponseEntity<?> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật người dùng")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDto userRequestDto
    ) {
        return ResponseEntity.ok(userService.updateUser(userRequestDto, id));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa người dùng")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUserById(id));
    }


}
