package me.huynhducphu.talent_bridge.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/22/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanyIdDto {
    @NotNull(message = "Công ty không được để trống")
    private Long id;
}
