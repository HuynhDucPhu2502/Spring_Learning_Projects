package me.huynhducphu.talent_bridge.service;

import java.time.Duration;

/**
 * Admin 7/17/2025
 **/
public interface RefreshTokenRedisService {
    void saveRefreshToken(String token, String userId, Duration expire);

    boolean validateToken(String token, String userId);

    void deleteRefreshToken(String token, String userId);

    String getUserIdByToken(String token, String userId);
}
