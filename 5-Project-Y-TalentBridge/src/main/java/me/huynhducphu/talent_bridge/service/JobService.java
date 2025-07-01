package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.job.JobRequestDto;
import me.huynhducphu.talent_bridge.dto.response.job.JobResponseDto;
import me.huynhducphu.talent_bridge.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * Admin 6/25/2025
 **/
public interface JobService {
    Page<JobResponseDto> findAllJobs(Specification<Job> spec, Pageable pageable);

    JobResponseDto findJobById(Long id);

    JobResponseDto saveJob(JobRequestDto jobRequestDto);

    JobResponseDto updateJobById(Long id, JobRequestDto jobRequestDto);

    JobResponseDto deleteJobById(Long id);

    List<JobResponseDto> findJobByCompanyId(Long id);
}
