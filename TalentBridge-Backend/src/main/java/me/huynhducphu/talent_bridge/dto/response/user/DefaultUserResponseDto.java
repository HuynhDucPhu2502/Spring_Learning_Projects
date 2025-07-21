package me.huynhducphu.talent_bridge.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.Gender;

import java.time.Instant;
import java.time.LocalDate;

/**
 * Admin 6/7/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DefaultUserResponseDto {

    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private String address;
    private Gender gender;
    private String logoUrl;
    private CompanyInformationDto company;
    private RoleInformationDto role;
    private Instant createdAt;
    private Instant updatedAt;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class CompanyInformationDto {
        private Long id;
        private String name;
        private String logoUrl;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class RoleInformationDto {
        private Long id;
        private String name;
    }


}
