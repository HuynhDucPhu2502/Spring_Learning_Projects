package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.job.JobRequestDto;
import me.huynhducphu.talent_bridge.dto.response.job.JobResponseDto;

/**
 * Admin 6/25/2025
 **/
public interface JobService {
    JobResponseDto saveJob(JobRequestDto jobRequestDto);
}
