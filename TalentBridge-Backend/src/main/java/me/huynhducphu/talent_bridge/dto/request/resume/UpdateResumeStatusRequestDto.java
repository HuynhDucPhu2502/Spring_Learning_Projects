package me.huynhducphu.talent_bridge.dto.request.resume;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.constant.ResumeStatus;

/**
 * Admin 7/7/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateResumeStatusRequestDto {

    @NotNull(message = "ID người dùng không được để trống")
    private Long id;
    @NotNull(message = "Trạng thái hồ sơ không được để trống")
    private ResumeStatus status;

}
