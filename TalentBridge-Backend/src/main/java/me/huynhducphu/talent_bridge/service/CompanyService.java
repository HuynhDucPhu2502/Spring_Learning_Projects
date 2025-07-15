package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.company.DefaultCompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyExtendedResponseDto;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 6/25/2025
 **/
public interface CompanyService {
    DefaultCompanyResponseDto saveCompany(DefaultCompanyRequestDto dto, MultipartFile logoFile);

    DefaultCompanyResponseDto updateCompany(DefaultCompanyRequestDto dto, Long id, MultipartFile logoFile);

    Page<DefaultCompanyResponseDto> findAllCompanies(Specification<Company> spec, Pageable pageable);

    Page<DefaultCompanyExtendedResponseDto> findAllCompaniesWithJobsCount(Specification<Company> spec, Pageable pageable);

    DefaultCompanyResponseDto findCompanyById(Long id);

    DefaultCompanyResponseDto deleteCompanyById(Long id);
}
