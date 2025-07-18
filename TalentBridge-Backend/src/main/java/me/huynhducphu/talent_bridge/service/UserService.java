package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.user.SelfUserUpdatePasswordRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.SelfUserUpdateProfileRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserCreateRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserUpdateRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.DefaultUserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 6/7/2025
 **/
public interface UserService {
    DefaultUserResponseDto saveUser(UserCreateRequestDto userCreateRequestDto);

    Page<DefaultUserResponseDto> findAllUser(Specification<User> spec, Pageable pageable);

    DefaultUserResponseDto findUserById(Long id);

    DefaultUserResponseDto updateUser(UserUpdateRequestDto userUpdateRequestDto);

    DefaultUserResponseDto deleteUserById(Long id);

    User findByEmail(String email);

    DefaultUserResponseDto updateSelfUserProfile(SelfUserUpdateProfileRequestDto selfUserUpdateProfileRequestDto);

    DefaultUserResponseDto updateSelfUserPassword(SelfUserUpdatePasswordRequestDto selfUserUpdatePasswordRequestDto);
}
