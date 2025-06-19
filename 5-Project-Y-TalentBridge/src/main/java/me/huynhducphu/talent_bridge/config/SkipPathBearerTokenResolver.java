package me.huynhducphu.talent_bridge.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;

/**
 * Admin 6/19/2025
 **/
public class SkipPathBearerTokenResolver implements BearerTokenResolver {

    private final BearerTokenResolver delegate = new DefaultBearerTokenResolver();

    @Override
    public String resolve(HttpServletRequest request) {
        String path = request.getRequestURI();

        if (path.contains("/auth/logout")) {
            return null;
        }
        return delegate.resolve(request);
    }
}
