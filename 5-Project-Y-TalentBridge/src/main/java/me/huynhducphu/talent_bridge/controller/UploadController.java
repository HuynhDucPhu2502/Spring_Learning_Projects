package me.huynhducphu.talent_bridge.controller;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.service.impl.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 6/25/2025
 **/
@RestController
@RequiredArgsConstructor
public class UploadController {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String url = s3Service.uploadFile(file);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body("Upload failed: " + e.getMessage());
        }
    }

}
