package me.huynhducphu.talent_bridge.service.impl;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.config.AuthConfiguration;
import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

/**
 * Admin 6/9/2025
 **/
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements me.huynhducphu.talent_bridge.service.AuthService {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    @Value("${jwt.access-token-expiration}")
    public Long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    public Long refreshTokenExpiration;

    @Override
    public String createAccessToken(
            String email,
            AuthTokenResponseDto.UserInformation userInformation
    ) {
        return buildJwt(accessTokenExpiration, userInformation);
    }

    @Override
    public String createRefreshToken(
            String email,
            AuthTokenResponseDto.UserInformation userInformation
    ) {
        return buildJwt(refreshTokenExpiration, userInformation);
    }

    @Override
    public ResponseCookie createCookie(String refreshToken) {
        return ResponseCookie
                .from("refresh_token", refreshToken)
                .httpOnly(true)
                .path("/")
                .sameSite("Strict")
                .maxAge(refreshTokenExpiration)
                .build();
    }

    @Override
    public Jwt validateToken(String token) {
        return jwtDecoder.decode(token);
    }

    private String buildJwt(Long expirationRate, AuthTokenResponseDto.UserInformation userInformation) {
        Instant now = Instant.now();
        Instant validity = now.plus(expirationRate, ChronoUnit.SECONDS);

        // Header
        JwsHeader jwsHeader = JwsHeader.with(AuthConfiguration.MAC_ALGORITHM).build();

        // Payload
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(userInformation.getEmail())
                .claim("user", userInformation)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

}
