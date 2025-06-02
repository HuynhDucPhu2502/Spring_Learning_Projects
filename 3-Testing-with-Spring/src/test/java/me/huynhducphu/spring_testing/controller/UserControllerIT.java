package me.huynhducphu.spring_testing.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.spring_testing.dto.UserDTO;
import me.huynhducphu.spring_testing.entity.User;

import me.huynhducphu.spring_testing.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;


/**
 * Admin 6/2/2025
 **/

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper om;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        this.userRepository.deleteAll();
    }

    @Test
    public void createUser_shouldReturnUser_whenEmailIsValid() throws Exception {
        // arrange
        UserDTO inputUser = new UserDTO("name", "email");
        User exOutputUser = new User(1L, "name", "email");

        // action
        String result = mockMvc
                .perform(
                        post("/users")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(om.writeValueAsBytes(inputUser))
                )
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        User output = om.readValue(result, User.class);

        // assert
        assertEquals(exOutputUser.getName(), output.getName());
        assertEquals(exOutputUser.getEmail(), output.getEmail());
    }

    @Test
    public void findAllUsers_shouldReturnAllUsers() throws Exception {
        // arrange
        User u1 = new User(null, "A", "a@example.com");
        User u2 = new User(null, "B", "b@example.com");
        userRepository.saveAndFlush(u1);
        userRepository.saveAndFlush(u2);

        // action
        String json = mockMvc
                .perform(get("/users"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        List<User> users = om.readValue(json, new TypeReference<>() {
        });

        // assert
        assertEquals(2, users.size());
        assertEquals("A", users.get(0).getName());
    }

    @Test
    public void findUserById_shouldReturnUser_WhenUserIsExisted() throws Exception {
        // arrange
        User u1 = new User(null, "A", "a@example.com");
        User saved = userRepository.saveAndFlush(u1);

        // action
        String json = mockMvc
                .perform(get("/users/" + saved.getId()))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        User user = om.readValue(json, User.class);

        // assert
        assertEquals(u1.getName(), user.getName());
        assertEquals(u1.getEmail(), user.getEmail());
    }

    @Test
    public void findUserById_shouldReturnUser_WhenUserIsNotExisted() throws Exception {
        // arrange

        // action
        mockMvc
                .perform(get("/users/" + 1))
                .andExpect(status().isNotFound())
                .andReturn();
        // assert
    }

    @Test
    public void deleteUserById_shouldReturnUser_WhenUserIsExisted() throws Exception {
        // arrange
        User u1 = new User(null, "A", "a@example.com");
        User saved = userRepository.saveAndFlush(u1);

        // action
        String json = mockMvc
                .perform(delete("/users/" + saved.getId()))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        User user = om.readValue(json, User.class);

        // assert
        assertEquals(u1.getName(), user.getName());
        assertEquals(u1.getEmail(), user.getEmail());
    }

    @Test
    public void deleteUserById_shouldReturnUser_WhenUserIsNotExisted() throws Exception {
        // arrange

        // action
        mockMvc
                .perform(delete("/users/" + 1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
        // assert
    }

    @Test
    void updateUser_shouldReturnUpdatedUser_WhenUserIsExisted() throws Exception {
        // arrange
        User u1 = new User(null, "old name", "old_email@example.com");
        User saved = this.userRepository.saveAndFlush(u1);

        UserDTO inputUserDTO = new UserDTO("new name", "new_email@example.com");
        User expectedUser = new User(null, "new name", "new_email@example.com");

        // act
        String json = mockMvc
                .perform(
                        put("/users/" + saved.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(om.writeValueAsBytes(inputUserDTO))
                )
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        User user = om.readValue(json, User.class);

        // assert
        assertEquals(expectedUser.getName(), user.getName());
        assertEquals(expectedUser.getEmail(), user.getEmail());

    }
}
