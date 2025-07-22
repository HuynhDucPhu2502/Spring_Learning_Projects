package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.company.DefaultCompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyExtendedResponseDto;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.model.CompanyLogo;
import me.huynhducphu.talent_bridge.model.User;
import me.huynhducphu.talent_bridge.repository.CompanyLogoRepository;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import me.huynhducphu.talent_bridge.repository.JobRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import me.huynhducphu.talent_bridge.service.JobService;
import me.huynhducphu.talent_bridge.service.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 6/12/2025
 **/
@Service
@RequiredArgsConstructor
@Transactional
public class CompanyServiceImpl implements me.huynhducphu.talent_bridge.service.CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyLogoRepository companyLogoRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    private final S3Service s3Service;
    private final JobService jobService;

    @Override
    public DefaultCompanyResponseDto saveCompany(DefaultCompanyRequestDto dto, MultipartFile logoFile) {
        Company company = new Company(dto.getName(), dto.getDescription(), dto.getAddress());

        Company savedCompany = companyRepository.saveAndFlush(company);

        if (logoFile != null && !logoFile.isEmpty()) {

            String url = s3Service.uploadFile(logoFile, "company-logos", company.getId().toString(), true);

            CompanyLogo logo = new CompanyLogo();
            logo.setCompany(company);
            logo.setLogoUrl(url);

            CompanyLogo savedLogo = companyLogoRepository.save(logo);
            savedCompany.setCompanyLogo(savedLogo);
        }

        return mapToResponseDto(savedCompany);
    }

    @Override
    public DefaultCompanyResponseDto updateCompany(
            DefaultCompanyRequestDto dto,
            Long id,
            MultipartFile logoFile,
            boolean isRecruiter
    ) {
        Company company;

        if (isRecruiter) {
            String email = SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();

            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

            if (user.getCompany() == null)
                throw new EntityNotFoundException("Không tìm thấy công ty người dùng");
            
            company = user.getCompany();
        } else
            company = companyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công ty"));

        company.setName(dto.getName());
        company.setDescription(dto.getDescription());
        company.setAddress(dto.getAddress());

        if (logoFile != null && !logoFile.isEmpty()) {
            String url = s3Service.uploadFile(logoFile, "company-logos", company.getId().toString(), true);

            CompanyLogo logo = company.getCompanyLogo();
            if (logo == null) {
                logo = new CompanyLogo();
                logo.setCompany(company);
                company.setCompanyLogo(logo);
            }
            logo.setLogoUrl(url);
        }

        return mapToResponseDto(companyRepository.saveAndFlush(company));
    }

    @Override
    public Page<DefaultCompanyResponseDto> findAllCompanies(Specification<Company> spec, Pageable pageable) {
        return companyRepository.findAll(spec, pageable)
                .map(this::mapToResponseDto);
    }


    @Override
    public Page<DefaultCompanyExtendedResponseDto> findAllCompaniesWithJobsCount(Specification<Company> spec, Pageable pageable) {
        return companyRepository.findAll(spec, pageable)
                .map(this::mapToExtendedResponseDto);
    }

    @Override
    public DefaultCompanyResponseDto findCompanyById(Long id) {
        return companyRepository.findById(id)
                .map(this::mapToResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công ty"));
    }

    @Override
    public DefaultCompanyResponseDto findSelfCompany() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        if (user.getCompany() == null)
            throw new EntityNotFoundException("Không tìm thấy công ty người dùng");

        return mapToResponseDto(user.getCompany());
    }

    @Override
    public DefaultCompanyResponseDto deleteCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy công ty"));

        userRepository.detachUsersFromCompany(company);

        if (company.getCompanyLogo() != null) {
            String logoUrl = company.getCompanyLogo().getLogoUrl();
            s3Service.deleteFileByUrl(logoUrl);
            companyLogoRepository.delete(company.getCompanyLogo());
        }

        if (company.getJobs() != null)
            company.getJobs().forEach(job -> jobService.deleteJobById(job.getId()));


        companyRepository.delete(company);
        return mapToResponseDto(company);
    }

    private DefaultCompanyResponseDto mapToResponseDto(Company company) {
        String logoUrl = null;

        if (company.getCompanyLogo() != null)
            logoUrl = company.getCompanyLogo().getLogoUrl();


        return new DefaultCompanyResponseDto(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getAddress(),
                logoUrl,
                company.getCreatedAt().toString(),
                company.getUpdatedAt().toString()
        );
    }

    private DefaultCompanyExtendedResponseDto mapToExtendedResponseDto(Company company) {
        String logoUrl = null;

        if (company.getCompanyLogo() != null)
            logoUrl = company.getCompanyLogo().getLogoUrl();

        Long jobsCount = jobRepository.countByCompanyId(company.getId());


        return new DefaultCompanyExtendedResponseDto(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getAddress(),
                logoUrl,
                company.getCreatedAt().toString(),
                company.getUpdatedAt().toString(),
                jobsCount
        );
    }
}

