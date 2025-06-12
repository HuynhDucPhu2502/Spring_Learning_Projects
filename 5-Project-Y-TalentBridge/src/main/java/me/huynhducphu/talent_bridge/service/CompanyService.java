package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Admin 6/12/2025
 **/
public interface CompanyService {
    CompanyResponseDto saveCompany(CompanyRequestDto companyRequestDto);

    Page<Company> findAllCompany(Pageable pageable);

    Company findCompanyById(Long id);

    CompanyResponseDto updateCompany(CompanyRequestDto companyRequestDto, Long id);

    CompanyResponseDto deleteCompanyById(Long id);
}
