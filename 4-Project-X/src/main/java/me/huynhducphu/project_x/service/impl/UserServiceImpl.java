package me.huynhducphu.project_x.service.impl;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.project_x.dto.UserDTO;
import me.huynhducphu.project_x.entitiy.User;
import me.huynhducphu.project_x.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 6/3/2025
 **/
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements me.huynhducphu.project_x.service.UserService {

    private final UserRepository userRepository;

    @Override
    public User handleSaveUser(UserDTO userDTO) {

        if (userRepository.existsByEmail(userDTO.getEmail()))
            throw new IllegalArgumentException("Email already exists");

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        return userRepository.saveAndFlush(user);
    }

    @Override
    public List<User> handleFindAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User handleFindUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User handleUpdateUserById(Long id, UserDTO userDTO) {
        return userRepository
                .findById(id)
                .map(user -> {

                    if (userRepository.existsByEmailAndIdNot(userDTO.getEmail(), id))
                        return null;

                    user.setName(userDTO.getName());
                    user.setEmail(userDTO.getEmail());
                    return userRepository.saveAndFlush(user);
                }).orElse(null);
    }

    @Override
    public boolean handleDeleteUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) return false;
        userRepository.delete(user);
        return true;
    }


}
