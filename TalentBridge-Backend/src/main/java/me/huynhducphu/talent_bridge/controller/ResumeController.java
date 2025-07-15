package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.request.resume.UpdateResumeStatusRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.DefaultResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.ResumeForDisplayResponseDto;
import me.huynhducphu.talent_bridge.model.Resume;
import me.huynhducphu.talent_bridge.model.constant.ResumeStatus;
import me.huynhducphu.talent_bridge.service.ResumeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @ApiMessage(value = "Tạo resume")
    public ResponseEntity<?> saveResume(
            @Valid @RequestPart("resume") ResumeRequestDto resumeRequestDto,
            @RequestPart(value = "pdfFile") MultipartFile pdfFile
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resumeService.saveResume(resumeRequestDto, pdfFile));
    }

    @GetMapping("/user/{userId}")
    @ApiMessage(value = "Lấy resume theo người dùng")
    public ResponseEntity<?> findResumesByUserId(
            @PathVariable Long userId,
            @Filter Specification<Resume> spec,
            @PageableDefault(size = 5) Pageable pageable) {
        Page<ResumeForDisplayResponseDto> page = resumeService.findResumesByUserId(userId, spec, pageable);

        PageResponseDto<ResumeForDisplayResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/users/{userId}/jobs/{jobId}")
    @ApiMessage(value = "Xóa resume theo user id và job id")
    public ResponseEntity<?> removeResumeByUserIdAndJobId(
            @PathVariable Long userId,
            @PathVariable Long jobId
    ) {
        return ResponseEntity.ok(resumeService.removeResumeByUserIdAndJobId(userId, jobId));
    }

    @PutMapping("/file/{id}")
    @ApiMessage(value = "Cập nhật file resume")
    public ResponseEntity<?> updateResumeFile(
            @PathVariable Long id,
            @RequestPart("pdfFile") MultipartFile pdfFile) {
        return ResponseEntity.ok(resumeService.updateResumeFile(id, pdfFile));
    }

    @GetMapping("/file/{id}")
    @ApiMessage(value = "Lấy file resume")
    public ResponseEntity<?> getResumeFileUrl(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResumeFileUrl(id));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách resume")
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

    @PutMapping("/status")
    @ApiMessage("Cập nhật trạng thái resume")
    public ResponseEntity<?> updateResumeStatus(
            @RequestBody UpdateResumeStatusRequestDto updateResumeStatusRequestDto) {
        return ResponseEntity.ok(resumeService.updateResumeStatus(updateResumeStatusRequestDto));
    }


}
