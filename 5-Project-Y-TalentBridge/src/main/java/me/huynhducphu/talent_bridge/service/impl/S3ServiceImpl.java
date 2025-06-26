package me.huynhducphu.talent_bridge.service.impl;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.exception.custom.S3UploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

/**
 * Admin 6/25/2025
 **/
@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements me.huynhducphu.talent_bridge.service.S3Service {

    private final S3Client s3Client;
    private final String awsBucketName;
    private final String awsRegion;

    @Override
    public String uploadFile(MultipartFile file, String folder, String fileName) {
        try {
            if (file == null || file.isEmpty())
                throw new S3UploadException("Tệp logo không được rỗng hoặc null");

            String key = String.format("%s/%s", folder, fileName);

            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(awsBucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putRequest, RequestBody.fromBytes(file.getBytes()));

            return String.format("https://%s.s3.%s.amazonaws.com/%s",
                    awsBucketName, awsRegion, key);

        } catch (IOException e) {
            throw new S3UploadException("Lỗi khi đọc dữ liệu từ tệp logo");
        } catch (Exception e) {
            throw new S3UploadException("Lỗi khi upload file lên S3");
        }
    }

    @Override
    public void deleteFileByUrl(String fileUrl) {
        try {
            if (fileUrl == null || fileUrl.isBlank()) {
                return;
            }

            String objectKey = extractObjectKeyFromUrl(fileUrl);

            DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(awsBucketName)
                    .key(objectKey)
                    .build();

            s3Client.deleteObject(deleteRequest);

        } catch (Exception e) {
            throw new S3UploadException("Lỗi khi xóa file khỏi S3");
        }
    }

    private String extractObjectKeyFromUrl(String url) {
        String base = String.format("https://%s.s3.%s.amazonaws.com/", awsBucketName, awsRegion);
        if (!url.startsWith(base)) {
            throw new S3UploadException("URL không hợp lệ hoặc không thuộc bucket hiện tại");
        }
        return url.substring(base.length());
    }


}
