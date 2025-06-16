package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Admin 6/12/2025
 **/
public interface AuthService {
    String createAccessToken(User user);

    String createRefreshToken(User user);

    ResponseCookie createCookie(String refreshToken);

    Jwt validateToken(String token);

    AuthTokenResponseDto.UserInformation mapToUserInformation(User user);

    AuthTokenResponseDto.UserInformation mapToUserInformation(String email);
}
