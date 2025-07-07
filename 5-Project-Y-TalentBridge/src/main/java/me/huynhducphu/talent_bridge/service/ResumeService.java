package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.request.resume.UpdateResumeStatusRequestDto;
import me.huynhducphu.talent_bridge.dto.response.resume.CreateResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.DefaultResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.GetResumeFileResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.ResumeForDisplayResponseDto;
import me.huynhducphu.talent_bridge.model.Resume;
import me.huynhducphu.talent_bridge.model.constant.ResumeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 7/3/2025
 **/
public interface ResumeService {
    CreateResumeResponseDto saveResume(
            ResumeRequestDto resumeRequestDto,
            MultipartFile pdfFile);

    Page<ResumeForDisplayResponseDto> findResumesByUserId(
            Long userId,
            Specification<Resume> spec,
            Pageable pageable);

    DefaultResumeResponseDto removeResumeByUserIdAndJobId(Long userId, Long jobId);

    DefaultResumeResponseDto updateResumeFile(Long id, MultipartFile pdfFile);

    GetResumeFileResponseDto getResumeFileUrl(Long id);

    Page<ResumeForDisplayResponseDto> findAllResumes(
            Specification<Resume> spec,
            Pageable pageable
    );

    DefaultResumeResponseDto updateResumeStatus(UpdateResumeStatusRequestDto updateResumeStatusRequestDto);
}
