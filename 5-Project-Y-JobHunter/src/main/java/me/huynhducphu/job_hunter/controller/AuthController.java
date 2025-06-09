package me.huynhducphu.job_hunter.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.job_hunter.dto.request.LoginRequestDto;
import me.huynhducphu.job_hunter.model.ApiResponse;
import me.huynhducphu.job_hunter.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 6/8/2025
 **/
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final SecurityUtil securityUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        Authentication authentication = authenticationManager.authenticate(token);

        String jwtToken = securityUtil.createToken(authentication);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Đăng nhập thành công",
                        null,
                        jwtToken
                )
        );
    }

}
