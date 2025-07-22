package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.request.resume.UpdateResumeStatusRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.ResumeForDisplayResponseDto;
import me.huynhducphu.talent_bridge.model.Resume;
import me.huynhducphu.talent_bridge.service.ResumeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * Admin 7/3/2025
 **/
@Tag(name = "Resume")
@RestController
@RequestMapping("/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping
    @ApiMessage(value = "Tạo Resume")
    @PreAuthorize("hasAuthority('POST /resumes')")
    @Operation(
            summary = "Tạo Resume",
            description = "Yêu cầu quyền: <b>POST /resumes</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> saveResume(
            @Valid @RequestPart("resume") ResumeRequestDto resumeRequestDto,
            @RequestPart(value = "pdfFile") MultipartFile pdfFile
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resumeService.saveResume(resumeRequestDto, pdfFile));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách resume")
    @PreAuthorize("hasAuthority('GET /resumes')")
    @Operation(
            summary = "Lấy danh sách resume",
            description = "Yêu cầu quyền: <b>GET /resumes</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findAllResumes(
            @Filter Specification<Resume> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<ResumeForDisplayResponseDto> page = resumeService.findAllResumes(spec, pageable);

        PageResponseDto<ResumeForDisplayResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/company")
    @ApiMessage(value = "Lấy danh sách resume thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('GET /resumes/company')")
    @Operation(
            summary = "Lấy danh sách resume theo company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>GET /resumes/company</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findAllResumesForRecruiterCompany(
            @Filter Specification<Resume> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<ResumeForDisplayResponseDto> page = resumeService.findAllResumesForRecruiterCompany(spec, pageable);

        PageResponseDto<ResumeForDisplayResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/me")
    @ApiMessage(value = "Lấy resume theo người dùng")
    @PreAuthorize("hasAuthority('GET /resumes/me')")
    @Operation(
            summary = "Lấy resume của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>GET /resumes/me</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> findSelfResumes(
            @Filter Specification<Resume> spec,
            @PageableDefault(size = 5) Pageable pageable) {
        Page<ResumeForDisplayResponseDto> page = resumeService.findSelfResumes(spec, pageable);

        PageResponseDto<ResumeForDisplayResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

//    @GetMapping("/{id}")
//    @ApiMessage(value = "Lấy resume theo id")
//    @PreAuthorize("hasAuthority('GET /resumes/{id}')")
//    @Operation(
//            summary = "Lấy resume theo id",
//            description = "Yêu cầu quyền: <b>GET /resumes/{id}</b>",
//            security = @SecurityRequirement(name = "bearerAuth")
//    )
//    public ResponseEntity<?> findByResumeById(@PathVariable Long id) {
//        return ResponseEntity.ok(resumeService.findResumeById(id));
//    }

    @DeleteMapping("/me/jobs/{jobId}")
    @ApiMessage(value = "Xóa resume theo job id của người dùng hiện tại")
    @PreAuthorize("hasAuthority('DELETE /resumes/me/jobs/{jobId}')")
    @Operation(
            summary = "Xóa resume theo job id của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>DELETE /resumes/me/jobs/{jobId}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> removeSelfResumeByJobId(
            @PathVariable Long jobId
    ) {
        return ResponseEntity.ok(resumeService.removeSelfResumeByJobId(jobId));
    }

    @PutMapping("/me/file/{id}")
    @ApiMessage(value = "Cập nhật file resume")
    @PreAuthorize("hasAuthority('PUT /resumes/me/file/{id}')")
    @Operation(
            summary = "Cập nhật file resume",
            description = "Yêu cầu quyền: <b>PUT /resumes/me/file/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateSelfResumeFile(
            @PathVariable Long id,
            @RequestPart("pdfFile") MultipartFile pdfFile) {
        return ResponseEntity.ok(resumeService.updateSelfResumeFile(id, pdfFile));
    }

    @GetMapping("/file/{id}")
    @ApiMessage(value = "Lấy file resume")
    @PreAuthorize("hasAuthority('GET /resumes/file/{id}')")
    @Operation(
            summary = "Lấy file resume",
            description = "Yêu cầu quyền: <b>GET /resumes/file/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> getResumeFileUrl(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResumeFileUrl(id));
    }

    @PutMapping("/status")
    @ApiMessage("Cập nhật trạng thái resume")
    @PreAuthorize("hasAuthority('PUT /resumes/status')")
    @Operation(
            summary = "Cập nhật trạng thái resume",
            description = "Yêu cầu quyền: <b>PUT /resumes/status</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateResumeStatus(
            @RequestBody UpdateResumeStatusRequestDto updateResumeStatusRequestDto) {
        return ResponseEntity.ok(resumeService.updateResumeStatus(updateResumeStatusRequestDto));
    }

    @PutMapping("/company/status")
    @ApiMessage("Cập nhật trạng thái resume thuộc company của người dùng hiện tại")
    @PreAuthorize("hasAuthority('PUT /resumes/company/status')")
    @Operation(
            summary = "Cập nhật trạng thái resume theo company của người dùng hiện tại",
            description = "Yêu cầu quyền: <b>PUT /resumes/company/status</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateResumeStatusForRecruiterCompany(
            @RequestBody UpdateResumeStatusRequestDto updateResumeStatusRequestDto) {
        return ResponseEntity.ok(resumeService.updateResumeStatusForRecruiterCompany(updateResumeStatusRequestDto));
    }


}
