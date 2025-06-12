package me.huynhducphu.talent_bridge.service;

import org.springframework.security.core.Authentication;

/**
 * Admin 6/12/2025
 **/
public interface AuthService {
    String createToken(Authentication authentication);
}
