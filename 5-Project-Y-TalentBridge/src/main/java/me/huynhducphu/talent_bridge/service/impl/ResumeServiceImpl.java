package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.resume.ResumeRequestDto;
import me.huynhducphu.talent_bridge.dto.response.resume.CreateResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.DefaultResumeResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.GetResumeFileResponseDto;
import me.huynhducphu.talent_bridge.dto.response.resume.ResumeForDisplayResponseDto;
import me.huynhducphu.talent_bridge.exception.custom.ResourceAlreadyExistsException;
import me.huynhducphu.talent_bridge.model.Job;
import me.huynhducphu.talent_bridge.model.Resume;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.JobRepository;
import me.huynhducphu.talent_bridge.repository.ResumeRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import me.huynhducphu.talent_bridge.service.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;

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
                resumeRequestDto.getStatus(),
                1L
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
            String generatedFileName = "resume-" + savedResume.getId() + "-" + resume.getVersion() + ".pdf";


            String key = s3Service.uploadFile(pdfFile, folderName, generatedFileName, false);

            savedResume.setFileKey(key);
        } else throw new EntityNotFoundException("Không tìm thấy tệp pdf");

        return new CreateResumeResponseDto(
                savedResume.getId(),
                savedResume.getCreatedAt(),
                savedResume.getCreatedBy()
        );
    }

    @Override
    public Page<ResumeForDisplayResponseDto> findResumesByUserId(
            Long userId,
            Specification<Resume> spec,
            Pageable pageable) {
        return resumeRepository
                .findByUserId(userId, spec, pageable)
                .map(this::mapToResumeForDisplayResponseDto);
    }


    @Override
    public DefaultResumeResponseDto removeResumeByUserIdAndJobId(Long userId, Long jobId) {
        Resume resume = resumeRepository
                .findByUserIdAndJobId(userId, jobId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy resume"));

        DefaultResumeResponseDto res = mapToResponseDto(resume);

        resume.setUser(null);
        resume.setJob(null);

        s3Service.deleteFileByKey(resume.getFileKey());

        Resume savedResume = resumeRepository.saveAndFlush(resume);
        resumeRepository.delete(savedResume);

        return res;
    }

    @Override
    public DefaultResumeResponseDto updateResumeFile(Long id, MultipartFile pdfFile) {
        Resume resume = resumeRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy resume"));

        if (pdfFile != null && !pdfFile.isEmpty()) {
            resume.setVersion(resume.getVersion() + 1);
            String newKey = generateKey(resume.getEmail(), resume.getId(), resume.getVersion());

            s3Service.deleteFileByKey(resume.getFileKey());
            s3Service.uploadFile(pdfFile, newKey, false);
            resume.setFileKey(newKey);
        } else throw new EntityNotFoundException("Không tìm thấy tệp pdf");

        resumeRepository.save(resume);

        return mapToResponseDto(resume);
    }

    @Override
    public GetResumeFileResponseDto getResumeFileUrl(Long id) {
        Resume resume = resumeRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy resume"));

        return new GetResumeFileResponseDto(
                s3Service.generatePresignedUrl(resume.getFileKey(), Duration.ofMinutes(15))
        );
    }

    @Override
    public Page<ResumeForDisplayResponseDto> findAllResumes(
            Specification<Resume> spec,
            Pageable pageable
    ) {
        return resumeRepository
                .findAll(spec, pageable)
                .map(this::mapToResumeForDisplayResponseDto);
    }

    private String generateKey(String email, Long id, Long version) {
        String safeEmail = email.replaceAll("[^a-zA-Z0-9]", "_");
        String folderName = "resume/" + safeEmail;
        String generatedFileName = "resume-" + id + "-" + version + ".pdf";

        return folderName + "/" + generatedFileName;
    }

    private DefaultResumeResponseDto mapToResponseDto(Resume resume) {
        return new DefaultResumeResponseDto(
                resume.getId(),
                resume.getUser().getEmail(),
                resume.getJob().getName(),
                resume.getJob().getCompany().getName(),
                resume.getCreatedAt().toString(),
                resume.getUpdatedAt().toString()
        );
    }

    private ResumeForDisplayResponseDto mapToResumeForDisplayResponseDto(Resume resume) {
        ResumeForDisplayResponseDto resumeForDisplayResponseDto = new ResumeForDisplayResponseDto();

        resumeForDisplayResponseDto.setId(resume.getId());
        resumeForDisplayResponseDto.setPdfUrl(s3Service.generatePresignedUrl(resume.getFileKey(), Duration.ofMinutes(15)));

        ResumeForDisplayResponseDto.User user = new ResumeForDisplayResponseDto.User(
                resume.getUser().getId(),
                resume.getUser().getEmail()
        );
        resumeForDisplayResponseDto.setUser(user);

        ResumeForDisplayResponseDto.Job job = new ResumeForDisplayResponseDto.Job(
                resume.getJob().getId(),
                resume.getJob().getName(),
                resume.getJob().getLocation(),
                resume.getJob().getSkills().stream().map(Skill::getName).toList(),
                resume.getJob().getLevel(),
                resume.getJob().getDescription()
        );
        resumeForDisplayResponseDto.setJob(job);

        ResumeForDisplayResponseDto.Company company = new ResumeForDisplayResponseDto.Company(
                resume.getJob().getCompany().getId(),
                resume.getJob().getCompany().getName(),
                resume.getJob().getCompany().getCompanyLogo().getLogoUrl()
        );
        resumeForDisplayResponseDto.setCompany(company);

        resumeForDisplayResponseDto.setCreatedAt(resume.getCreatedAt().toString());
        resumeForDisplayResponseDto.setUpdatedAt(resume.getUpdatedAt().toString());

        return resumeForDisplayResponseDto;
    }


}
