package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.model.RefreshToken;
import me.huynhducphu.talent_bridge.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;

/**
 * Admin 6/16/2025
 **/
@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements me.huynhducphu.talent_bridge.service.RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public boolean verifyAndDeleteOldRefreshToken(String email, String token) {
        RefreshToken refreshToken = refreshTokenRepository
                .findByUserEmailAndToken(email, token)
                .orElseThrow(() ->
                        new EntityNotFoundException("Không tìm thấy refresh token ứng với người dùng")
                );

        refreshTokenRepository.delete(refreshToken);
        return true;
    }

    public void findAndDeleteOldRefreshTokenIfExists(String email, String token) {
        RefreshToken refreshToken = refreshTokenRepository
                .findByUserEmailAndToken(email, token)
                .orElse(null);

        if (refreshToken != null) refreshTokenRepository.delete(refreshToken);
    }


}
