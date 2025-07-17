package me.huynhducphu.talent_bridge.service;

import java.time.Duration;

/**
 * Admin 7/17/2025
 **/
public interface RefreshTokenRedisService {
    void saveRefreshToken(String token, String userId, Duration expire);

    boolean validateToken(String token);

    void deleteRefreshToken(String token);

    String getUserIdByToken(String token);
}
