package me.huynhducphu.spring_testing.service;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.spring_testing.dto.UserDTO;
import me.huynhducphu.spring_testing.entity.User;
import me.huynhducphu.spring_testing.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Admin 6/1/2025
 **/
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User handleSaveUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) return null;

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        return userRepository.save(user);
    }

    public List<User> handleFindAllUsers() {
        return userRepository.findAll();
    }

    public User handleFindById(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) return null;
        return user.get();
    }

    public User handleDeleteById(Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) return null;

        userRepository.delete(user.get());
        return user.get();
    }

    public User handleUpdateById(Long id, UserDTO userDTO) {
        Optional<User> optUser = userRepository.findById(id);

        if (optUser.isEmpty()) return null;

        User user = optUser.get();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        return userRepository.save(user);
    }


}
