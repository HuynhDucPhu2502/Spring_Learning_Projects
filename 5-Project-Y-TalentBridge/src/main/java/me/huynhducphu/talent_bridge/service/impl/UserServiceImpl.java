package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.user.UserCreateRequestDto;
import me.huynhducphu.talent_bridge.dto.request.user.UserUpdateRequestDto;
import me.huynhducphu.talent_bridge.dto.response.user.UserResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Admin 6/7/2025
 **/
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements me.huynhducphu.talent_bridge.service.UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto saveUser(UserCreateRequestDto userCreateRequestDto) {

        if (userRepository.existsByEmail(userCreateRequestDto.getEmail()))
            throw new DataIntegrityViolationException("Email đã tồn tại");

        User user = new User();
        user.setName(userCreateRequestDto.getName());
        user.setEmail(userCreateRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(userCreateRequestDto.getPassword()));
        user.setAge(userCreateRequestDto.getAge());
        user.setAddress(userCreateRequestDto.getAddress());
        user.setGender(userCreateRequestDto.getGender());

        if (userCreateRequestDto.getCompany() != null) {
            Company company = handleFindCompanyId(userCreateRequestDto.getCompany().getId());
            user.setCompany(company);
        }

        User savedUser = userRepository.saveAndFlush(user);

        return mapToUserResponseDto(savedUser);
    }

    @Override
    public Page<UserResponseDto> findAllUser(Specification<User> spec, Pageable pageable) {
        return userRepository
                .findAll(spec, pageable)
                .map(this::mapToUserResponseDto);
    }

    @Override
    public UserResponseDto findUserById(Long id) {
        return userRepository
                .findById(id)
                .map(this::mapToUserResponseDto)
                .orElseThrow(() ->
                        new EntityNotFoundException("Không tìm thấy người dùng")
                );
    }

    @Override
    public UserResponseDto updateUser(UserUpdateRequestDto userUpdateRequestDto) {

        User user = userRepository
                .findById(userUpdateRequestDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        user.setName(userUpdateRequestDto.getName());
        user.setAge(userUpdateRequestDto.getAge());
        user.setAddress(userUpdateRequestDto.getAddress());
        user.setGender(userUpdateRequestDto.getGender());

        if (userUpdateRequestDto.getCompany() != null) {
            Company company = handleFindCompanyId(userUpdateRequestDto.getCompany().getId());
            user.setCompany(company);
        }

        User savedUser = userRepository.save(user);

        return mapToUserResponseDto(savedUser);
    }

    @Override
    public UserResponseDto deleteUserById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Không tìm thấy người dùng")
                );

        userRepository.delete(user);
        return mapToUserResponseDto(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));
    }

    public UserResponseDto mapToUserResponseDto(User user) {
        UserResponseDto.CompanyInformationDto company = null;
        if (user.getCompany() != null)
            company = new UserResponseDto.CompanyInformationDto(
                    user.getCompany().getId(),
                    user.getCompany().getName()
            );

        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getAddress(),
                user.getGender(),
                company,
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    public Company handleFindCompanyId(Long id) {
        return companyRepository.findById(id).orElse(null);
    }


}
