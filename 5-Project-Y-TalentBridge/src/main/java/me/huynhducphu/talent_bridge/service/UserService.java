package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.UserRequestDto;
import me.huynhducphu.talent_bridge.dto.response.UserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
public interface UserService {
    UserResponseDto saveUser(UserRequestDto userRequestDto);

    Page<User> findAllUser(Specification<User> spec, Pageable pageable);

    UserResponseDto findUserById(Long id);

    UserResponseDto updateUser(UserRequestDto userRequestDto, Long id);

    UserResponseDto deleteUserById(Long id);
}
