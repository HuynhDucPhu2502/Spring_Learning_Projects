package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.config.auth.AuthConfiguration;
import me.huynhducphu.talent_bridge.dto.response.user.AuthTokenResponseDto;
import me.huynhducphu.talent_bridge.model.common.RefreshToken;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.RefreshTokenRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
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

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.access-token-expiration}")
    public Long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    public Long refreshTokenExpiration;

    @Override
    public String createAccessToken(User user) {
        return buildJwt(accessTokenExpiration, user, false);
    }

    @Override
    public String createRefreshToken(User user) {
        return buildJwt(refreshTokenExpiration, user, true);
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

    @Override
    public AuthTokenResponseDto.UserInformation mapToUserInformation(User user) {
        if (user == null)
            throw new EntityNotFoundException("Không tìm thấy người dùng");


        return new AuthTokenResponseDto.UserInformation(
                user.getEmail(),
                user.getName(),
                user.getId()
        );
    }

    @Override
    public AuthTokenResponseDto.UserInformation mapToUserInformation(String email) {
        if (email == null || email.isBlank())
            throw new EntityNotFoundException("Email không được để trống");

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));


        return mapToUserInformation(user);
    }

    private String buildJwt(
            Long expirationRate,
            User user,
            boolean isCreatingRefreshToken
    ) {
        Instant now = Instant.now();
        Instant validity = now.plus(expirationRate, ChronoUnit.SECONDS);

        // Header
        JwsHeader jwsHeader = JwsHeader.with(AuthConfiguration.MAC_ALGORITHM).build();

        // Payload
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(user.getEmail())
                .claim("user", mapToUserInformation(user))
                .build();

        String res = jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();

        if (isCreatingRefreshToken) {
            RefreshToken refreshToken = new RefreshToken(
                    null,
                    res,
                    validity,
                    user
            );
            refreshTokenRepository.save(refreshToken);
        }

        return res;
    }


}
