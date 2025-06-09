package me.huynhducphu.job_hunter.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import me.huynhducphu.job_hunter.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * Admin 6/8/2025
 **/
@Service("userDetailsService")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

        Optional<me.huynhducphu.job_hunter.model.User> savedUser = userRepository.findByEmail(username);
        if (savedUser.get().equals(null)) throw new UsernameNotFoundException("Không tìm thấy người dùng");

        return User.builder()
                .username(savedUser.get().getEmail())
                .password(savedUser.get().getPassword())
                .authorities(Collections.emptyList())
                .build();
    }
}
