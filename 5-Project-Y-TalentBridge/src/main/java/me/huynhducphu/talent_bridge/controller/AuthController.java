package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.user.LoginRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.service.AuthService;
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
        AuthTokenResponseDto.UserInformation userInformation = new AuthTokenResponseDto.UserInformation(
                user.getEmail(),
                user.getName(),
                user.getId()
        );

        // CREATE ACCESS TOKEN AND REFRESH TOKEN WITH CLAIM "user": USER INFORMATION
        return buildAuthResponse(user, userInformation);
    }

    @GetMapping("/account")
    @ApiMessage(value = "Lấy thông tin người dùng")
    public ResponseEntity<?> getAccount() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByEmail(email);

        AuthTokenResponseDto.UserInformation userInformation = new AuthTokenResponseDto.UserInformation(
                user.getEmail(),
                user.getName(),
                user.getId()
        );


        return ResponseEntity.ok(userInformation);
    }

    @GetMapping("/refresh")
    @ApiMessage(value = "Lấy refresh token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(value = "refresh_token") String refreshToken
    ) {
        String email = authService.validateToken(refreshToken).getSubject();
        User user = userService.findByEmail(email);

        AuthTokenResponseDto.UserInformation userInformation = new AuthTokenResponseDto.UserInformation(
                user.getEmail(),
                user.getName(),
                user.getId()
        );

        return buildAuthResponse(user, userInformation);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", null)
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

    private ResponseEntity<?> buildAuthResponse(User user, AuthTokenResponseDto.UserInformation userInformation) {
        String accessToken = authService.createAccessToken(user.getEmail(), userInformation);
        String newRefreshToken = authService.createRefreshToken(user.getEmail(), userInformation);

        AuthTokenResponseDto authTokenResponseDto = new AuthTokenResponseDto(userInformation, accessToken);
        ResponseCookie responseCookie = authService.createCookie(newRefreshToken);


        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authTokenResponseDto);
    }

}
