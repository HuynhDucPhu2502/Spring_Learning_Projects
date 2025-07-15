package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.job.JobRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.job.JobResponseDto;
import me.huynhducphu.talent_bridge.model.Job;
import me.huynhducphu.talent_bridge.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/25/2025
 **/
@Tag(name = "Job")
@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    @ApiMessage(value = "Tạo công việc")
    public ResponseEntity<?> saveJob(@Valid @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.saveJob(jobRequestDto));
    }

    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy công việc theo id")
    public ResponseEntity<?> findJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findJobById(id));
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật công việc theo id")
    public ResponseEntity<?> updateJobById(
            @PathVariable Long id,
            @Valid @RequestBody JobRequestDto jobRequestDto
    ) {
        return ResponseEntity.ok(jobService.updateJobById(id, jobRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách công việc")
    public ResponseEntity<?> findAllJobs(
            @Filter Specification<Job> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<JobResponseDto> page = jobService.findAllJobs(spec, pageable);

        PageResponseDto<JobResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/company/{id}")
    @ApiMessage(value = "Lấy công việc theo công ty")
    public ResponseEntity<?> findJobByCompanyId(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findJobByCompanyId(id));
    }


    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa công việc")
    public ResponseEntity<?> deleteJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.deleteJobById(id));
    }


}
