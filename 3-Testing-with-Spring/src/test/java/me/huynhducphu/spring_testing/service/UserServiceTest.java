package me.huynhducphu.spring_testing.service;

import me.huynhducphu.spring_testing.dto.UserDTO;
import me.huynhducphu.spring_testing.entity.User;
import me.huynhducphu.spring_testing.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Admin 6/1/2025
 **/
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void handleCreateUser_shouldReturnUser_whenEmailIsValid() {
        // arrange: chuẩn bị
        UserDTO inputUser = new UserDTO("name", "email");
        User outputUser = new User(1L, "name", "email");

        when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(false);
        when(this.userRepository.save(any())).thenReturn(outputUser);

        // act: hành động
        User user = this.userService.handleSaveUser(inputUser);

        // assert: so sánh
        assertEquals(outputUser.getId(), user.getId());
        assertEquals(outputUser.getName(), user.getName());
        assertEquals(outputUser.getEmail(), user.getEmail());
    }

    @Test
    void handleCreateUser_shouldReturnNull_whenEmailIsExisted() {
        // arrange: chuẩn bị
        UserDTO inputUser = new UserDTO("name", "email");

        when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(true);

        // act: hành động
        User user = this.userService.handleSaveUser(inputUser);

        // assert: so sánh
        assertNull(user);

    }

    @Test
    void handleFindAllUsers_shouldReturnAllUsers() {
        // arrange: chuẩn bị
        List<User> output = List.of(
                new User(1L, "name", "email"),
                new User(2L, "name2", "email2")
        );

        when(this.userRepository.findAll()).thenReturn(output);

        // act: hành động
        List<User> users = this.userService.handleFindAllUsers();

        // assert: so sánh
        assertEquals(2, users.size());
        assertEquals("name", users.get(0).getName());
    }

    @Test
    void handleFindById_shouldReturnUser_WhenUserIsExisted() {
        // arrange: chuẩn bị
        Long inputId = 1L;
        Optional<User> output = Optional.of(new User(1L, "name", "email"));

        when(this.userRepository.findById(inputId)).thenReturn(output);

        // act: hành động
        User user = this.userService.handleFindById(inputId);

        // assert: so sánh
        assertEquals(user, output.get());
    }

    @Test
    void handleFindById_shouldReturnNull_WhenUserIsNotExisted() {
        // arrange: chuẩn bị
        Long inputId = 1L;
        Optional<User> output = Optional.empty();

        when(this.userRepository.findById(inputId)).thenReturn(output);

        // act: hành động
        User user = this.userService.handleFindById(inputId);

        // assert: so sánh
        assertNull(user);
    }

    @Test
    void handleDeleteById_shouldReturnUser_WhenUserIsExisted() {
        // arrange: chuẩn bị
        Long inputId = 1L;
        Optional<User> output = Optional.of(new User(1L, "name", "email"));

        when(this.userRepository.findById(inputId)).thenReturn(output);

        // act: hành động
        User user = this.userService.handleDeleteById(inputId);

        // assert: so sánh
        verify(this.userRepository).delete(any());
        assertEquals(user, output.get());
    }

    @Test
    void handleDeleteById_shouldReturnNull_WhenUserIsNotExisted() {
        // arrange: chuẩn bị
        Long inputId = 1L;
        Optional<User> output = Optional.empty();

        when(this.userRepository.findById(inputId)).thenReturn(output);

        // act: hành động
        User user = this.userService.handleDeleteById(inputId);

        // assert: so sánh
        verify(this.userRepository, never()).delete(any());
        assertNull(user);
    }

    @Test
    void handleUpdateById_shouldReturnUpdatedUser_WhenUserIsExisted() {
        // arrange
        Long inputId = 1L;
        UserDTO userDTO = new UserDTO("old name", "old email");
        User existingUser = new User(1L, "old name", "old email");
        User updatedUser = new User(1L, "new name", "new email");

        when(this.userRepository.findById(inputId)).thenReturn(Optional.of(existingUser));
        when(this.userRepository.save(existingUser)).thenReturn(updatedUser);

        // act
        User result = this.userService.handleUpdateById(inputId, userDTO);

        // assert
        verify(this.userRepository).save(existingUser);
        assertEquals(updatedUser, result);
    }


}
