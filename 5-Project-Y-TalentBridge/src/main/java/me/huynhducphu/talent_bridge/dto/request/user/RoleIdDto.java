package me.huynhducphu.talent_bridge.dto.request.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/11/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleIdDto {
    @NotNull(message = "Chức vụ không được để trống")
    private Long id;
}
