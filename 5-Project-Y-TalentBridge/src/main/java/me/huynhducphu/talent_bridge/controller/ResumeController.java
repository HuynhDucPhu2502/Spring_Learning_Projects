package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.response.ApiResponse;
import me.huynhducphu.talent_bridge.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 7/3/2025
 **/
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

    @GetMapping("/file/{id}")
    @ApiMessage(value = "Lấy file resume")
    public ResponseEntity<?> getResumeFileUrl(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResumeFileUrl(id));
    }


}
