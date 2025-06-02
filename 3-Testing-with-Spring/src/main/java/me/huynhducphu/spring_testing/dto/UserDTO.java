package me.huynhducphu.spring_testing.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/1/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {

    @NotBlank(message = "Tên không được để trống")
    private String name;

    @NotBlank(message = "Email không hợp lệ")
    private String email;

}
