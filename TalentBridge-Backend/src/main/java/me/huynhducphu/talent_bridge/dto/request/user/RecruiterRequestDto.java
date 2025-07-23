package me.huynhducphu.talent_bridge.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/23/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecruiterRequestDto {
    @NotBlank(message = "Email không được để trống")
    private String email;
}
