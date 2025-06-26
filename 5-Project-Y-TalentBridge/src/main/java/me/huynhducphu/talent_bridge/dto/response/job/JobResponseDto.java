package me.huynhducphu.talent_bridge.dto.response.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

/**
 * Admin 6/25/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponseDto {
    private Long id;
    private String name;
    private String location;
    private Double salary;
    private Integer quantity;
    private String level;
    private String description;
    private Instant startDate;
    private Instant endDate;
    private Boolean active;

    private CompanyDto company;
    private List<SkillDto> skills;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CompanyDto {
        private Long id;
        private String name;
        private String logo;
        private String address;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SkillDto {
        private Long id;
        private String name;
    }
}