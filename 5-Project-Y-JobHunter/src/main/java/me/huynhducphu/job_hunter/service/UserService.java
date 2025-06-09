package me.huynhducphu.job_hunter.service;

import me.huynhducphu.job_hunter.dto.request.CreateUserRequestDto;
import me.huynhducphu.job_hunter.dto.response.UserResponseDto;
import me.huynhducphu.job_hunter.model.User;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
public interface UserService {
    UserResponseDto saveUser(CreateUserRequestDto createUserRequestDto);

    List<User> findAllUser();

    UserResponseDto findUserById(Long id);

    UserResponseDto updateUser(CreateUserRequestDto createUserRequestDto, Long id);

    UserResponseDto deleteUserById(Long id);
}
