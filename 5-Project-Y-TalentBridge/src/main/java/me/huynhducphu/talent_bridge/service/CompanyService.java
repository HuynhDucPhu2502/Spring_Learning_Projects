package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.company.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;


/**
 * Admin 6/12/2025
 **/
public interface CompanyService {
    CompanyResponseDto saveCompany(CompanyRequestDto companyRequestDto);

    Page<CompanyResponseDto> findAllCompanies(Specification<Company> spec, Pageable pageable);

    CompanyResponseDto findCompanyById(Long id);

    CompanyResponseDto updateCompany(CompanyRequestDto companyRequestDto, Long id);

    CompanyResponseDto deleteCompanyById(Long id);
}
