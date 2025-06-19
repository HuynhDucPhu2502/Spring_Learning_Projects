package me.huynhducphu.talent_bridge.config;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.exception.CustomAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

/**
 * Admin 6/8/2025
 **/
@Configuration
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity httpSecurity,
            CustomAuthenticationEntryPoint customAuthenticationEntryPoint
    ) throws Exception {
        httpSecurity
                .authorizeHttpRequests(
                        auth ->
                                auth
                                        .requestMatchers(
                                                "/auth/login",
                                                "/auth/logout",
                                                "/auth/refresh-token",
                                                "/").permitAll()
                                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2
                                .jwt(Customizer.withDefaults())
                                .authenticationEntryPoint(customAuthenticationEntryPoint)
                                .bearerTokenResolver(new SkipPathBearerTokenResolver())
                )
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .csrf(csrf -> csrf.disable())
                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> httpBasic.disable());


        return httpSecurity.build();
    }


}
