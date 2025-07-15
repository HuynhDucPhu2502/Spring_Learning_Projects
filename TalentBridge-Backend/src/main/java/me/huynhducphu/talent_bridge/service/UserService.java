package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.user.UserCreateRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserUpdateRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 6/7/2025
 **/
public interface UserService {
    UserResponseDto saveUser(UserCreateRequestDto userCreateRequestDto);

    Page<UserResponseDto> findAllUser(Specification<User> spec, Pageable pageable);

    UserResponseDto findUserById(Long id);

    UserResponseDto updateUser(UserUpdateRequestDto userUpdateRequestDto);

    UserResponseDto deleteUserById(Long id);

    User findByEmail(String email);
}
