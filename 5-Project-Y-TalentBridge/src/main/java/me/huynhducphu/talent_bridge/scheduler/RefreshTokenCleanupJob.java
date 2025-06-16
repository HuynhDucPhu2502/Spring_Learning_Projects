package me.huynhducphu.talent_bridge.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.huynhducphu.talent_bridge.repository.RefreshTokenRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

/**
 * Admin 6/16/2025
 **/
@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RefreshTokenCleanupJob {

    private final RefreshTokenRepository refreshTokenRepository;

    @Scheduled(fixedRate = 86400000)
    public void removeExpiredTokens() {
        int deleted = refreshTokenRepository.deleteAllByExpiryDateBefore(Instant.now());

        log.info("[Scheduler] Remove {} expired refresh tokens", deleted);
    }
}
