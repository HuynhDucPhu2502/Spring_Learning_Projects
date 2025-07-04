package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.job.JobRequestDto;
import me.huynhducphu.talent_bridge.dto.response.job.JobResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.model.CompanyLogo;
import me.huynhducphu.talent_bridge.model.Job;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import me.huynhducphu.talent_bridge.repository.JobRepository;
import me.huynhducphu.talent_bridge.repository.SkillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Admin 6/25/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class JobServiceImpl implements me.huynhducphu.talent_bridge.service.JobService {

    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final CompanyRepository companyRepository;

    @Override
    public Page<JobResponseDto> findAllJobs(Specification<Job> spec, Pageable pageable) {
        return jobRepository.findAll(spec, pageable)
                .map(this::mapToResponseDto);
    }

    @Override
    public JobResponseDto findJobById(Long id) {
        return jobRepository
                .findById(id)
                .map(this::mapToResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công việc"));
    }

    @Override
    public JobResponseDto saveJob(JobRequestDto jobRequestDto) {

        Job job = new Job(
                jobRequestDto.getName(),
                jobRequestDto.getLocation(),
                jobRequestDto.getSalary(),
                jobRequestDto.getQuantity(),
                jobRequestDto.getLevel(),
                jobRequestDto.getDescription(),
                jobRequestDto.getStartDate(),
                jobRequestDto.getEndDate(),
                jobRequestDto.getActive()
        );

        Company company = null;
        if (jobRequestDto.getCompany() != null)
            company = companyRepository
                    .findById(jobRequestDto.getCompany().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Công ty không tồn tại"));


        List<Skill> skills = null;
        if (jobRequestDto.getSkills() != null) {
            List<Long> skillIds = jobRequestDto
                    .getSkills()
                    .stream()
                    .map(JobRequestDto.SkillId::getId)
                    .toList();

            skills = skillRepository.findAllById(skillIds);

            if (skills.size() != skillIds.size()) {
                throw new EntityNotFoundException("Kỹ năng không tồn tại");
            }
        }


        job.setCompany(company);
        job.setSkills(skills);

        Job savedJob = jobRepository.saveAndFlush(job);

        return mapToResponseDto(savedJob);
    }

    @Override
    public JobResponseDto updateJobById(Long id, JobRequestDto jobRequestDto) {

        Job job = jobRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công việc"));

        job.setName(jobRequestDto.getName());
        job.setLocation(jobRequestDto.getLocation());
        job.setSalary(jobRequestDto.getSalary());
        job.setQuantity(jobRequestDto.getQuantity());
        job.setLevel(jobRequestDto.getLevel());
        job.setDescription(jobRequestDto.getDescription());
        job.setStartDate(jobRequestDto.getStartDate());
        job.setEndDate(jobRequestDto.getEndDate());
        job.setActive(jobRequestDto.getActive());

        if (jobRequestDto.getCompany() != null
                && !Objects.equals(jobRequestDto.getCompany().getId(), job.getCompany().getId())) {
            Company company = companyRepository
                    .findById(jobRequestDto.getCompany().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Công ty không tồn tại"));

            job.setCompany(company);
        }

        if (jobRequestDto.getSkills() != null) {
            Set<Long> requestedSkillIds = jobRequestDto.getSkills().stream()
                    .map(JobRequestDto.SkillId::getId)
                    .collect(Collectors.toSet());

            Set<Skill> currentSkills = new HashSet<>(job.getSkills());

            currentSkills.removeIf(skill -> !requestedSkillIds.contains(skill.getId()));

            Set<Long> currentSkillIds = currentSkills.stream()
                    .map(Skill::getId)
                    .collect(Collectors.toSet());

            Set<Long> newSkillIdsToAdd = new HashSet<>(requestedSkillIds);
            newSkillIdsToAdd.removeAll(currentSkillIds);

            if (!newSkillIdsToAdd.isEmpty()) {
                List<Skill> skillsToAdd = skillRepository.findAllById(newSkillIdsToAdd);
                currentSkills.addAll(skillsToAdd);
            }

            job.setSkills(new ArrayList<>(currentSkills));
        }

        Job updatedJob = jobRepository.saveAndFlush(job);

        return mapToResponseDto(updatedJob);
    }

    @Override
    public JobResponseDto deleteJobById(Long id) {
        Job job = jobRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công việc"));

        if (job.getSkills() != null) job.getSkills().clear();

        Job updatedJob = jobRepository.saveAndFlush(job);
        jobRepository.delete(updatedJob);

        return mapToResponseDto(job);
    }

    @Override
    public List<JobResponseDto> findJobByCompanyId(Long id) {
        return jobRepository
                .findByCompanyId(id)
                .stream()
                .map(job -> {
                    JobResponseDto dto = mapToResponseDto(job);
                    dto.setDescription(null);
                    dto.setCompany(null);
                    return dto;
                })
                .collect(Collectors.toList());
    }


    private JobResponseDto mapToResponseDto(Job job) {
        Company company = job.getCompany();
        JobResponseDto.CompanyDto companyDto = null;

        if (company != null) {
            CompanyLogo logo = company.getCompanyLogo();
            String logoUrl = (logo != null) ? logo.getLogoUrl() : null;

            companyDto = new JobResponseDto.CompanyDto(
                    company.getId(),
                    company.getName(),
                    logoUrl,
                    company.getAddress()
            );
        }

        List<JobResponseDto.SkillDto> skillDtos = job.getSkills() == null
                ? List.of()
                : job.getSkills().stream()
                .map(skill -> new JobResponseDto.SkillDto(skill.getId(), skill.getName()))
                .toList();

        return new JobResponseDto(
                job.getId(),
                job.getName(),
                job.getLocation(),
                job.getSalary(),
                job.getQuantity(),
                job.getLevel().toString(),
                job.getDescription(),
                job.getStartDate(),
                job.getEndDate(),
                job.getActive(),
                companyDto,
                skillDtos
        );
    }


}
