package me.huynhducphu.job_hunter.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/7/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequestDto {

    @NotBlank(message = "Tên người dùng không được để trống")
    private String name;

    @NotBlank(message = "Email người dùng không được để trống")
    @Email(
            message = "Định dạng email không hợp lệ",
            regexp = "^[\\w\\-.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$"
    )
    private String email;

    @NotBlank(message = "Mật khẩu người dùng không được để trống")
    private String password;
    
}
