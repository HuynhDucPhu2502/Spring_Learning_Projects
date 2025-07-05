package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.response.resume.CreateResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.GetResumeFileResponseDto;
import me.huynhducphu.talent_bridge.exception.custom.ResourceAlreadyExistsException;
import me.huynhducphu.talent_bridge.model.Job;
import me.huynhducphu.talent_bridge.model.Resume;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.JobRepository;
import me.huynhducphu.talent_bridge.repository.ResumeRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import me.huynhducphu.talent_bridge.service.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.Instant;

/**
 * Admin 7/3/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class ResumeServiceImpl implements me.huynhducphu.talent_bridge.service.ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final S3Service s3Service;

    @Override
    public CreateResumeResponseDto saveResume(
            ResumeRequestDto resumeRequestDto,
            MultipartFile pdfFile) {

        Resume resume = new Resume(
                resumeRequestDto.getEmail(),
                resumeRequestDto.getStatus()
        );

        User user = userRepository
                .findById(resumeRequestDto.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        if (!user.getEmail().equals(resume.getEmail()))
            throw new EntityNotFoundException("Truy cập bị từ chối");

        Job job = jobRepository
                .findById(resumeRequestDto.getJob().getId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công việc"));

        if (resumeRepository.existsByUserIdAndJobId(user.getId(), job.getId()))
            throw new ResourceAlreadyExistsException("Người dùng đã nộp resume cho công việc này");


        resume.setJob(job);
        resume.setUser(user);


        Resume savedResume = resumeRepository.saveAndFlush(resume);

        if (pdfFile != null && !pdfFile.isEmpty()) {
            String safeEmail = savedResume.getEmail().replaceAll("[^a-zA-Z0-9]", "_");
            String folderName = "resume/" + safeEmail;
            String generatedFileName = "resume-" + savedResume.getId() + ".pdf";


            String key = s3Service.uploadFile(pdfFile, folderName, generatedFileName, false);

            savedResume.setFileKey(key);
        }

        return new CreateResumeResponseDto(
                savedResume.getId(),
                savedResume.getCreatedAt(),
                savedResume.getCreatedBy()
        );
    }


    @Override
    public GetResumeFileResponseDto getResumeFileUrl(Long id) {
        Resume resume = resumeRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy resume"));

        return new GetResumeFileResponseDto(
                s3Service.generatePresignedUrl(resume.getFileKey(), Duration.ofMinutes(15)),
                Instant.now().plus(Duration.ofMinutes(5))
        );

    }

}
