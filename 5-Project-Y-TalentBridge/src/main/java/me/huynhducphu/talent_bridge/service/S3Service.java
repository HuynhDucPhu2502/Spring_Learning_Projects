package me.huynhducphu.talent_bridge.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 6/26/2025
 **/
public interface S3Service {
    String uploadFile(MultipartFile file, String folder, String fileName);

    void deleteFileByUrl(String fileUrl);
}
