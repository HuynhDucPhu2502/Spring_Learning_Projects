package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.company.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.CompanyExtendedResponseDto;
import me.huynhducphu.talent_bridge.dto.response.company.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

/**
 * Admin 6/25/2025
 **/
public interface CompanyService {
    CompanyResponseDto saveCompany(CompanyRequestDto dto, MultipartFile logoFile);

    CompanyResponseDto updateCompany(CompanyRequestDto dto, Long id, MultipartFile logoFile);

    Page<CompanyResponseDto> findAllCompanies(Specification<Company> spec, Pageable pageable);

    Page<CompanyExtendedResponseDto> findAllCompaniesWithJobsCount(Specification<Company> spec, Pageable pageable);

    CompanyResponseDto findCompanyById(Long id);

    CompanyResponseDto deleteCompanyById(Long id);
}
