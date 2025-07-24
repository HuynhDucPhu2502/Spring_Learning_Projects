package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import org.springframework.security.access.prepost.PreAuthorize;
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
    @ApiMessage(value = "Tạo Job")
    @PreAuthorize("hasAuthority('POST /jobs')")
    @Operation(
            summary = "Tạo Job",
            description = "Yêu cầu quyền: <b>POST /jobs</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> saveJob(@Valid @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.saveJob(jobRequestDto, false));
    }

    @PostMapping("/company")
    @ApiMessage(value = "Tạo Job thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('POST /jobs/company')")
    @Operation(
            summary = "Tạo Job thuộc company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>POST /jobs/company</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> saveJobForRecruiterPage(@Valid @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.saveJob(jobRequestDto, true));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách Job")
    @PreAuthorize("hasAuthority('GET /jobs') OR isAnonymous()")
    @Operation(
            summary = "Lấy danh sách Job",
            description = "Yêu cầu quyền: <b>GET /jobs</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
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

    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy Job theo id")
    @PreAuthorize("hasAuthority('GET /jobs/{id}') OR isAnonymous()")
    @Operation(
            summary = "Lấy Job theo id",
            description = "Yêu cầu quyền: <b>GET /jobs/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findJobById(id));
    }

    @GetMapping("/companies/{id}")
    @ApiMessage(value = "Lấy Job theo Company")
    @PreAuthorize("hasAuthority('GET /jobs/companies/{id}') OR isAnonymous()")
    @Operation(
            summary = "Lấy Job theo Company",
            description = "Yêu cầu quyền: <b>GET /jobs/companies/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findJobByCompanyId(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findJobByCompanyId(id));
    }

    @GetMapping("/company")
    @ApiMessage(value = "Lấy danh sách Job thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('GET /jobs/company')")
    @Operation(
            summary = "Lấy danh sách Job theo company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>GET /jobs/company</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findAllJobsForRecruiterCompany(
            @Filter Specification<Job> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<JobResponseDto> page = jobService.findAllJobsForRecruiterCompany(spec, pageable);

        PageResponseDto<JobResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật Job theo id")
    @PreAuthorize("hasAuthority('PUT /jobs/{id}')")
    @Operation(
            summary = "Cập nhật Job theo id",
            description = "Yêu cầu quyền: <b>PUT /jobs/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateJobById(
            @PathVariable Long id,
            @Valid @RequestBody JobRequestDto jobRequestDto
    ) {
        return ResponseEntity.ok(jobService.updateJobById(id, jobRequestDto, false));
    }

    @PutMapping("/company/{id}")
    @ApiMessage(value = "Cập nhật Job theo id thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('PUT /jobs/company/{id}')")
    @Operation(
            summary = "Cập nhật Job theo id thuộc company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>PUT /jobs/company/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateJobByIdForRecruiterCompany(
            @PathVariable Long id,
            @Valid @RequestBody JobRequestDto jobRequestDto
    ) {
        return ResponseEntity.ok(jobService.updateJobById(id, jobRequestDto, true));
    }


    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa Job theo id")
    @PreAuthorize("hasAuthority('DELETE /jobs/{id}')")
    @Operation(
            summary = "Xóa Job theo id",
            description = "Yêu cầu quyền: <b>DELETE jobs/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> deleteJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.deleteJobById(id));
    }

    @DeleteMapping("/company/{id}")
    @ApiMessage(value = "Xóa Job theo id thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('DELETE /jobs/company/{id}')")
    @Operation(
            summary = "Xóa Job theo id thuộc company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>DELETE jobs/company/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> deleteJobByIdForRecruiterCompany(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.deleteJobByIdForRecruiterCompany(id));
    }


}
