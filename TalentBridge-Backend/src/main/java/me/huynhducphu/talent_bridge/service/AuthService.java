package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.auth.UserLoginRequestDto;
import me.huynhducphu.talent_bridge.dto.request.auth.SessionMetaRequest;
import me.huynhducphu.talent_bridge.dto.request.auth.UserRegisterRequestDto;
import me.huynhducphu.talent_bridge.dto.response.auth.AuthResult;
import me.huynhducphu.talent_bridge.dto.response.auth.SessionMetaResponse;
import me.huynhducphu.talent_bridge.dto.response.user.UserDetailsResponseDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserSessionResponseDto;
import org.springframework.http.ResponseCookie;

import java.util.List;

/**
 * Admin 6/12/2025
 **/
public interface AuthService {

    UserSessionResponseDto handleRegister(UserRegisterRequestDto userRegisterRequestDto);

    AuthResult handleLogin(UserLoginRequestDto userLoginRequestDto);

    ResponseCookie handleLogout(String refreshToken);

    UserDetailsResponseDto getCurrentUserDetails();

    AuthResult handleRefresh(String refreshToken, SessionMetaRequest sessionMetaRequest);

    void removeSession(String sessionId);

    List<SessionMetaResponse> getAllSessionMetas(String refreshToken);

    UserSessionResponseDto getCurrentUser();


}
