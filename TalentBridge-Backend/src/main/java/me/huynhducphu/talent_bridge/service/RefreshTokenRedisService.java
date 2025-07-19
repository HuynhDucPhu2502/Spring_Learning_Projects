package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.auth.SessionMetaRequest;
import me.huynhducphu.talent_bridge.dto.response.auth.SessionMetaResponse;
import me.huynhducphu.talent_bridge.model.SessionMeta;

import java.time.Duration;
import java.util.List;

/**
 * Admin 7/17/2025
 **/
public interface RefreshTokenRedisService {
    void saveRefreshToken(String token, String userId, SessionMetaRequest sessionMetaRequest, Duration expire);

    boolean validateToken(String token, String userId);

    void deleteRefreshToken(String token, String userId);

    List<SessionMetaResponse> getAllSessionMetas(String userId, String currentRefreshToken);
}
