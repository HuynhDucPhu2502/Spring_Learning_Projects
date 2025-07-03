package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.response.resume.CreateResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.GetResumeFileResponseDto;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 7/3/2025
 **/
public interface ResumeService {
    CreateResumeResponseDto saveResume(
            ResumeRequestDto resumeRequestDto,
            MultipartFile pdfFile);

    GetResumeFileResponseDto getResumeFileUrl(Long id);
}
