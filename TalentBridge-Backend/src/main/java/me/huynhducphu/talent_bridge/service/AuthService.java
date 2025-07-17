package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.user.LoginRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.AuthResult;
import me.huynhducphu.talent_bridge.dto.response.user.UserDetailsResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserSessionResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.http.ResponseCookie;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Admin 6/12/2025
 **/
public interface AuthService {

    void verifyLoginCredentials(LoginRequestDto loginRequestDto);

    ResponseCookie logoutRemoveCookie(String refreshToken);

    AuthResult buildAuthResult(String email);

    UserDetailsResponseDto getCurrentUserDetails();

    AuthResult refreshAuthToken(String refreshToken);

    boolean isCurrentUser(User user);

    AuthResult buildAuthResult(User user);

    UserSessionResponseDto getCurrentUser();


}
