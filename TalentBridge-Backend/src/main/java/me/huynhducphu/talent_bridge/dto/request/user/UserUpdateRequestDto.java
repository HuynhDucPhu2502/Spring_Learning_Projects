package me.huynhducphu.talent_bridge.dto.request.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.Gender;

/**
 * Admin 6/14/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserUpdateRequestDto {

    @NotNull(message = "ID Không được để trống")
    private Long id;
    private String name;
    private Gender gender;
    private Integer age;
    private String address;
    private CompanyIdDto company;
    private RoleIdDto role;
}
