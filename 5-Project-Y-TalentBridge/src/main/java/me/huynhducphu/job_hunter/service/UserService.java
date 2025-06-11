package me.huynhducphu.job_hunter.service;

import me.huynhducphu.job_hunter.dto.request.UserRequestDto;
import me.huynhducphu.job_hunter.dto.response.UserResponseDto;
import me.huynhducphu.job_hunter.model.User;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
public interface UserService {
    UserResponseDto saveUser(UserRequestDto userRequestDto);

    List<User> findAllUser();

    UserResponseDto findUserById(Long id);

    UserResponseDto updateUser(UserRequestDto userRequestDto, Long id);

    UserResponseDto deleteUserById(Long id);
}
