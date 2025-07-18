package me.huynhducphu.talent_bridge.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/18/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SelfUserUpdatePasswordRequestDto {

    @NotBlank(message = "Mật khẩu hiện tại không được để trống")
    private String oldPassword;

    @NotBlank(message = "Mật khẩu mới không được để trống")
    private String newPassword;

}
