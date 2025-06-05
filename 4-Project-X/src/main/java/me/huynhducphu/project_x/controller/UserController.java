package me.huynhducphu.project_x.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.project_x.dto.UserDTO;
import me.huynhducphu.project_x.entitiy.ApiResponse;
import me.huynhducphu.project_x.entitiy.User;
import me.huynhducphu.project_x.service.UserService;
import me.huynhducphu.project_x.service.impl.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Admin 6/3/2025
 **/
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<?>> saveUser(
            @RequestBody @Valid UserDTO userDTO
    ) {
        User user = userService.handleSaveUser(userDTO);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        HttpStatus.CREATED,
                        "User created successfully",
                        user
                ));
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<User>>> findAllUsers() {
        ApiResponse<List<User>> response = new ApiResponse<>(
                HttpStatus.OK,
                "Find all users successfully",
                userService.handleFindAllUsers()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> findUserById(@PathVariable("id") Long id) {
        User user = userService.handleFindUserById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(
                        HttpStatus.OK,
                        "Find user by id successfully",
                        user
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateUserById(
            @PathVariable("id") Long id,
            @RequestBody @Valid UserDTO userDTO
    ) {
        User user = userService.handleUpdateUserById(id, userDTO);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(
                        HttpStatus.OK,
                        "Update user by id successfully",
                        user
                ));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> deleteUserById(@PathVariable("id") Long id) {
        User user = userService.handleDeleteUserById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(
                        HttpStatus.OK,
                        "Delete user by id successfully",
                        user
                ));
    }


}
