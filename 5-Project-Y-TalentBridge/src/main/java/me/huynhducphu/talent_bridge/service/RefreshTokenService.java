package me.huynhducphu.talent_bridge.service;

/**
 * Admin 6/16/2025
 **/
public interface RefreshTokenService {
    boolean verifyAndDeleteOldRefreshToken(String email, String token);
}
