package me.huynhducphu.talent_bridge.dto.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseCookie;

/**
 * Admin 7/17/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResult {
    private AuthTokenResponseDto authTokenResponseDto;
    private ResponseCookie responseCookie;
}
