package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.user.LoginRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.RefreshTokenRepository;
import me.huynhducphu.talent_bridge.service.AuthService;
import me.huynhducphu.talent_bridge.service.RefreshTokenService;
import me.huynhducphu.talent_bridge.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/8/2025
 **/
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final AuthService authService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;


    @PostMapping("/login")
    @ApiMessage(value = "Đăng nhập thành công")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {

        // EXTRACT PRINCIPAL AND CREDENTIAL FROM REQUEST INTO TOKEN
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginRequestDto.getEmail(),
                loginRequestDto.getPassword()
        );

        // VERIFY TOKEN + SAVE AUTHENTICATION INTO CONTEXT
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // FIND USER IN DATABASE AND CREATE USER INFORMATION INSTANCE
        User user = userService.findByEmail(loginRequestDto.getEmail());

        // CREATE ACCESS TOKEN AND REFRESH TOKEN WITH CLAIM "user": USER INFORMATION
        return buildAuthResponse(user);
    }

    @GetMapping("/account")
    @ApiMessage(value = "Lấy thông tin người dùng")
    public ResponseEntity<?> getAccount() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AuthTokenResponseDto.UserInformation userInformation =
                authService.mapToUserInformation(email);


        return ResponseEntity.ok(userInformation);
    }

    @PostMapping("/refresh")
    @ApiMessage(value = "Lấy refresh token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(value = "refresh_token") String refreshToken
    ) {
        String email = authService.validateToken(refreshToken).getSubject();
        refreshTokenService.verifyAndDeleteOldRefreshToken(email, refreshToken);

        User user = userService.findByEmail(email);
        return buildAuthResponse(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @CookieValue(value = "refresh_token", required = false) String refreshToken
    ) {
        if (refreshToken != null) {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            refreshTokenService.verifyAndDeleteOldRefreshToken(email, refreshToken);
        }

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", "")
                .httpOnly(true)
                .path("/")
                .sameSite("Strict")
                .maxAge(0)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    private ResponseEntity<?> buildAuthResponse(User user) {
        String accessToken = authService.createAccessToken(user);
        String refreshToken = authService.createRefreshToken(user);


        AuthTokenResponseDto authTokenResponseDto = new AuthTokenResponseDto(
                authService.mapToUserInformation(user),
                accessToken
        );
        ResponseCookie responseCookie = authService.createCookie(refreshToken);


        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authTokenResponseDto);
    }

}
