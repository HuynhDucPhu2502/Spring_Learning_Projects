package me.huynhducphu.talent_bridge.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

/**
 * Admin 6/25/2025
 **/
@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;
    private final String awsBucketName;
    private final String awsRegion;

    public String uploadFile(MultipartFile file) throws IOException {
        String key = String.format("%s/%s", "public", file.getOriginalFilename());

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(awsBucketName)
                .key(key)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putRequest, RequestBody.fromBytes(file.getBytes()));

        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                awsBucketName, awsRegion, key);
    }

}
