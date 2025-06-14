package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.UserRequestDto;
import me.huynhducphu.talent_bridge.dto.response.UserResponseDto;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements me.huynhducphu.talent_bridge.service.UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {

        if (userRepository.existsByEmail(userRequestDto.getEmail()))
            throw new DataIntegrityViolationException("Email đã tồn tại");

        User user = new User();
        user.setName(userRequestDto.getName());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));

        User savedUser = userRepository.saveAndFlush(user);

        return new UserResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    @Override
    public Page<User> findAllUser(Specification<User> spec, Pageable pageable) {
        return userRepository.findAll(spec, pageable);
    }

    @Override
    public UserResponseDto findUserById(Long id) {
        return userRepository
                .findById(id)
                .map(user -> new UserResponseDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .orElseThrow(() ->
                        new EntityNotFoundException("Không tìm thấy người dùng")
                );
    }

    @Override
    public UserResponseDto updateUser(UserRequestDto userRequestDto, Long id) {

        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        if (userRepository.existsByEmailAndIdNot(userRequestDto.getEmail(), user.getId()))
            throw new DataIntegrityViolationException("Email đã tồn tại");

        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());
        user.setName(userRequestDto.getName());

        User savedUser = userRepository.save(user);
        return new UserResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    @Override
    public UserResponseDto deleteUserById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Không tìm thấy người dùng")
                );

        userRepository.delete(user);
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }


}
