package me.huynhducphu.job_hunter.util;

import com.nimbusds.jose.util.Base64;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.job_hunter.config.AuthConfiguration;
import me.huynhducphu.job_hunter.config.SecurityConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

/**
 * Admin 6/9/2025
 **/
@Service
@RequiredArgsConstructor
public class SecurityUtil {

    private final JwtEncoder jwtEncoder;

    @Value("${jwt.expiration}")
    public Long jwtExpiration;

    public String createToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validity = now.plus(jwtExpiration, ChronoUnit.SECONDS);

        // Header
        JwsHeader jwsHeader = JwsHeader.with(AuthConfiguration.MAC_ALGORITHM).build();

        // Payload
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim("authorities", authentication)
                .build();


        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }


}
