package me.huynhducphu.talent_bridge.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.Gender;

import java.time.LocalDate;

/**
 * Admin 7/20/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegisterRequestDto {

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

    private LocalDate dob;

    private String address;

    private Gender gender;

    private boolean recruiter;

}
