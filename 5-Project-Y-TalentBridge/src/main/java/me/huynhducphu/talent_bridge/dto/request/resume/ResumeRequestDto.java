package me.huynhducphu.talent_bridge.dto.request.resume;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.ResumeStatus;

/**
 * Admin 6/29/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResumeRequestDto {

    @NotBlank(message = "Email người dùng không được để trống")
    @Email(
            message = "Định dạng email không hợp lệ",
            regexp = "^[\\w\\-.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$"
    )
    private String email;

    @NotNull(message = "Trạng thái hồ sơ không được để trống")
    private ResumeStatus status;

    @NotNull(message = "Người dùng không được để trống")
    private User user;

    @NotNull(message = "Công việc không được để trống")
    private Job job;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class User {
        private Long id;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Job {
        private Long id;
    }

}
