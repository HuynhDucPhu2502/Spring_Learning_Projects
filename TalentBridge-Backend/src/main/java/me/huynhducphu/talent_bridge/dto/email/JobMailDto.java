package me.huynhducphu.talent_bridge.dto.email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Admin 7/24/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobMailDto {
    private Long id;
    private String name;
    private Double salary;

    private List<SkillDto> skills;
    private CompanyDto company;

    private String applyUrl;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SkillDto {
        private Long id;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CompanyDto {
        private Long id;
        private String name;
        private String location;
    }

    public JobMailDto(Long id, String name, Double salary, String applyUrl) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.applyUrl = applyUrl;
    }
}
