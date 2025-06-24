package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.common.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

/**
 * Admin 6/16/2025
 **/
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    int deleteAllByExpiryDateBefore(Instant now);

    int deleteByToken(String token);

    Optional<RefreshToken> findByUserEmailAndToken(String email, String token);
}
