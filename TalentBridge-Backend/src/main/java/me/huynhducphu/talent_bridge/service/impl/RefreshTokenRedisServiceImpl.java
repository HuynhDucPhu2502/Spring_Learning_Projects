package me.huynhducphu.talent_bridge.service.impl;

import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * Admin 7/17/2025
 **/
@Service
@RequiredArgsConstructor
public class RefreshTokenRedisServiceImpl implements me.huynhducphu.talent_bridge.service.RefreshTokenRedisService {

    private final RedisTemplate<String, String> redisTemplate;

    private String buildKey(String token) {
        return "refresh_token:" + DigestUtils.sha256Hex(token);
    }

    @Override
    public void saveRefreshToken(String token, String userId, Duration expire) {
        redisTemplate.opsForValue().set(buildKey(token), userId, expire);
    }

    @Override
    public boolean validateToken(String token) {
        return redisTemplate.hasKey(buildKey(token));
    }

    @Override
    public void deleteRefreshToken(String token) {
        redisTemplate.delete(buildKey(token));
    }

    @Override
    public String getUserIdByToken(String token) {
        return redisTemplate.opsForValue().get(buildKey(token));
    }

}
