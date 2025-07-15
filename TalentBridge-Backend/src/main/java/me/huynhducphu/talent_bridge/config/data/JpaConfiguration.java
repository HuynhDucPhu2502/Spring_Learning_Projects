package me.huynhducphu.talent_bridge.config.data;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * Admin 6/11/2025
 **/
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfiguration {

    @Bean
    public AuditorAware<String> auditorProvider() {

        return () -> Optional.ofNullable(
                SecurityContextHolder.getContext().getAuthentication()
        ).map(Authentication::getName);

    }

}
