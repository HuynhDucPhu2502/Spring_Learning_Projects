package me.huynhducphu.talent_bridge.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.Gender;

import java.time.Instant;
import java.time.LocalDate;

/**
 * Admin 7/17/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDetailsResponseDto {
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private String address;
    private Gender gender;
    private String logoUrl;
    private Instant createdAt;
    private Instant updatedAt;
}
