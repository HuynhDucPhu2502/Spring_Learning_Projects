package me.huynhducphu.project_x.service;

import me.huynhducphu.project_x.dto.UserDTO;
import me.huynhducphu.project_x.entitiy.User;

import java.util.List;

/**
 * Admin 6/3/2025
 **/
public interface UserService {
    List<User> handleFindAllUsers();

    User handleSaveUser(UserDTO userDTO);

    User handleFindUserById(Long id);

    User handleUpdateUserById(Long id, UserDTO userDTO);

    User handleDeleteUserById(Long id);


}
