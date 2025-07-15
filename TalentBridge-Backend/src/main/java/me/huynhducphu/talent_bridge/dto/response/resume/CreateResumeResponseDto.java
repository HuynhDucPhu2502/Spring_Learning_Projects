package me.huynhducphu.talent_bridge.dto.response.resume;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Admin 7/3/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateResumeResponseDto {

    private Long id;
    private Instant createdAt;
    private String createdBy;

}


