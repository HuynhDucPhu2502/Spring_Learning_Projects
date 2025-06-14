package me.huynhducphu.talent_bridge.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/9/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthTokenResponseDto {

    private String accessToken;
    private String refreshToken;

}
