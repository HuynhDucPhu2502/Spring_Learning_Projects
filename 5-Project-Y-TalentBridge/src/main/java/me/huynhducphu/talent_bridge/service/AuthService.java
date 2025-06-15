package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Admin 6/12/2025
 **/
public interface AuthService {
    String createAccessToken(String email, AuthTokenResponseDto.UserInformation userInformation);

    String createRefreshToken(String email, AuthTokenResponseDto.UserInformation userInformation);

    ResponseCookie createCookie(String refreshToken);

    Jwt validateToken(String token);
}
