package me.huynhducphu.project_x.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.project_x.dto.UserDTO;
import me.huynhducphu.project_x.entitiy.User;
import me.huynhducphu.project_x.service.UserService;
import me.huynhducphu.project_x.service.impl.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> saveUser(
            @RequestBody @Valid UserDTO userDTO,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(bindingResult.getAllErrors().stream()
                        .map(error -> error.getDefaultMessage())
                );

        User user;
        try {
            user = userService.handleSaveUser(userDTO);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }

        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);

    }

    @GetMapping("")
    public ResponseEntity<List<User>> findAllUsers() {
        return ResponseEntity.ok(userService.handleFindAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable("id") Long id) {
        User user = userService.handleFindUserById(id);

        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserById(
            @PathVariable("id") Long id,
            @RequestBody @Valid UserDTO userDTO,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(bindingResult.getAllErrors().stream()
                        .map(error -> error.getDefaultMessage())
                );


        User user = userService.handleUpdateUserById(id, userDTO);

        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") Long id) {
        if (userService.handleDeleteUserById(id)) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }


}
