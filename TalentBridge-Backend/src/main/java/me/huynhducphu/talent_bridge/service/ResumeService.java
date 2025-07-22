package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.request.resume.UpdateResumeStatusRequestDto;
import me.huynhducphu.talent_bridge.dto.response.resume.CreateResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.DefaultResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.GetResumeFileResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.ResumeForDisplayResponseDto;
import me.huynhducphu.talent_bridge.model.Resume;
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

    Page<ResumeForDisplayResponseDto> findAllResumesForRecruiterCompany(
            Specification<Resume> spec,
            Pageable pageable
    );

    Page<ResumeForDisplayResponseDto> findSelfResumes(
            Specification<Resume> spec,
            Pageable pageable);

    DefaultResumeResponseDto removeSelfResumeByJobId(Long jobId);

    DefaultResumeResponseDto updateSelfResumeFile(Long id, MultipartFile pdfFile);

    GetResumeFileResponseDto getResumeFileUrl(Long id);

    Page<ResumeForDisplayResponseDto> findAllResumes(
            Specification<Resume> spec,
            Pageable pageable
    );

    DefaultResumeResponseDto updateResumeStatus(UpdateResumeStatusRequestDto updateResumeStatusRequestDto);

    DefaultResumeResponseDto updateResumeStatusForRecruiterCompany(
            UpdateResumeStatusRequestDto updateResumeStatusRequestDto);
}
