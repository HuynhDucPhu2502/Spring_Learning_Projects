package me.huynhducphu.talent_bridge.service;

import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;

/**
 * Admin 6/26/2025
 **/
public interface S3Service {
    String uploadFile(MultipartFile file, String folder, String fileName, boolean getUrl);

    String uploadFile(MultipartFile file, String key, boolean getUrl);

    String generatePresignedUrl(String key, Duration expireDuration);

    void deleteFileByUrl(String fileUrl);
}
