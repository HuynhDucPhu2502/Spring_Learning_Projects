package me.huynhducphu.talent_bridge.dto.response.subscriber;

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
public class DefaultSubscriberResponseDto {

    private Long id;
    private String email;
    private List<SkillDto> skills;

    public DefaultSubscriberResponseDto(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SkillDto {
        private Long id;
        private String name;
    }
}
