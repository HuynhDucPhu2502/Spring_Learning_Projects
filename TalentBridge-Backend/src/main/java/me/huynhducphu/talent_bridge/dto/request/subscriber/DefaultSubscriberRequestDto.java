package me.huynhducphu.talent_bridge.dto.request.subscriber;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class DefaultSubscriberRequestDto {

    @NotNull(message = "Danh sách kỹ năng không được để trống")
    @Size(min = 1, message = "Phải có ít nhất 1 kỹ năng")
    @Valid
    private List<SkillId> skills;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SkillId {
        @NotNull(message = "ID kỹ năng không được để trống")
        private Long id;
    }
}
