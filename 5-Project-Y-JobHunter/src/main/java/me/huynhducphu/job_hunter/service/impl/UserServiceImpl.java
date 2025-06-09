package me.huynhducphu.job_hunter.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.job_hunter.dto.request.UserRequestDto;
import me.huynhducphu.job_hunter.dto.response.UserResponseDto;
import me.huynhducphu.job_hunter.model.User;
import me.huynhducphu.job_hunter.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements me.huynhducphu.job_hunter.service.UserService {

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
    public List<User> findAllUser() {
        return userRepository.findAll();
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
