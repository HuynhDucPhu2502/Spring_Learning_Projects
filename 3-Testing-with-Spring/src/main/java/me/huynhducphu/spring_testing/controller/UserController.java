package me.huynhducphu.spring_testing.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.spring_testing.dto.UserDTO;
import me.huynhducphu.spring_testing.entity.User;
import me.huynhducphu.spring_testing.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/1/2025
 **/
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result
    ) {
        if (result.hasErrors()) return ResponseEntity.badRequest().body(result.getAllErrors());

        User user = userService.handleSaveUser(userDTO);

        if (user == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @GetMapping("")
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(userService.handleFindAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Long id) {
        User user = userService.handleFindById(id);

        if (user == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        User user = userService.handleDeleteById(id);

        if (user == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO
    ) {
        User user = userService.handleUpdateById(id, userDTO);

        if (user == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(user);
    }


}
