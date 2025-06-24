package me.huynhducphu.talent_bridge.dto.request.company;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/12/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanyRequestDto {


    @NotBlank(message = "Tên công ty không được để trống")
    private String name;

    @NotBlank(message = "Mô tả không được để trống")
    private String description;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    @NotBlank(message = "Logo không được để trống")
    private String logo;

}
