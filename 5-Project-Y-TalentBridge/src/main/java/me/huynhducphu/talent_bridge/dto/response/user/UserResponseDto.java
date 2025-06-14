package me.huynhducphu.talent_bridge.dto.response.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.Gender;

import java.time.Instant;

/**
 * Admin 6/7/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDto {

    private Long id;
    private String name;
    private String email;
    private Integer age;
    private String address;
    private Gender gender;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Instant createdAt;
    private Instant updatedAt;

}
