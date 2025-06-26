package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.job.JobRequestDto;
import me.huynhducphu.talent_bridge.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 6/25/2025
 **/
@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<?> saveJob(@Valid @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.saveJob(jobRequestDto));
    }

}
