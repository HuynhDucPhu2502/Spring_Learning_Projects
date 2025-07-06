package me.huynhducphu.talent_bridge.dto.response.resume;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/6/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DefaultResumeResponseDto {

    private Long id;
    private String email;
    private String jobName;
    private String companyName;


}
