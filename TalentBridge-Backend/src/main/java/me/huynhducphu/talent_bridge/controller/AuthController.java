package me.huynhducphu.talent_bridge.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.user.LoginRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.AuthResult;
import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserDetailsResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserSessionResponseDto;
import me.huynhducphu.talent_bridge.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/8/2025
 **/
@Tag(name = "Auth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @ApiMessage(value = "Đăng nhập thành công")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequestDto loginRequestDto
    ) {
        authService.verifyLoginCredentials(loginRequestDto);
        return buildAuthResponse(loginRequestDto.getEmail());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @CookieValue(value = "refresh_token", required = false) String refreshToken
    ) {
        ResponseCookie responseCookie = authService.logoutRemoveCookie(refreshToken);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    @GetMapping("/me")
    @ApiMessage(value = "Trả về thông tin phiên đăng nhập của người dùng hiện tại")
    public ResponseEntity<UserSessionResponseDto> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }

    @GetMapping("/me/details")
    @ApiMessage(value = "Trả về thông tin chi tiết của người dùng hiện tại")
    public ResponseEntity<UserDetailsResponseDto> getCurrentUserDetails() {
        return ResponseEntity.ok(authService.getCurrentUserDetails());
    }

    @PostMapping("/refresh-token")
    @ApiMessage(value = "Lấy refresh token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(value = "refresh_token") String refreshToken
    ) {
        AuthResult authResult = authService.refreshAuthToken(refreshToken);

        AuthTokenResponseDto authTokenResponseDto = authResult.getAuthTokenResponseDto();
        ResponseCookie responseCookie = authResult.getResponseCookie();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authTokenResponseDto);
    }

    private ResponseEntity<?> buildAuthResponse(String email) {
        AuthResult authResult = authService.buildAuthResult(email);
        AuthTokenResponseDto authTokenResponseDto = authResult.getAuthTokenResponseDto();
        ResponseCookie responseCookie = authResult.getResponseCookie();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authTokenResponseDto);
    }


}
