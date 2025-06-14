package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 6/12/2025
 **/
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements me.huynhducphu.talent_bridge.service.CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    public CompanyResponseDto saveCompany(CompanyRequestDto companyRequestDto) {
        Company company = new Company(
                null,
                companyRequestDto.getName(),
                companyRequestDto.getDescription(),
                companyRequestDto.getAddress(),
                companyRequestDto.getLogo()
        );

        Company savedCompany = companyRepository.saveAndFlush(company);

        return new CompanyResponseDto(
                savedCompany.getId(),
                savedCompany.getName(),
                savedCompany.getDescription(),
                savedCompany.getAddress(),
                savedCompany.getLogo()
        );
    }

    @Override
    public Page<Company> findAllCompany(Specification<Company> spec, Pageable pageable) {
        return companyRepository.findAll(spec, pageable);
    }

    @Override
    public Company findCompanyById(Long id) {
        return companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));
    }

    @Override
    public CompanyResponseDto updateCompany(CompanyRequestDto companyRequestDto, Long id) {
        Company company = companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        company.setName(companyRequestDto.getName());
        company.setDescription(companyRequestDto.getDescription());
        company.setAddress(companyRequestDto.getAddress());
        company.setLogo(companyRequestDto.getLogo());

        Company savedCompany = companyRepository.saveAndFlush(company);

        return new CompanyResponseDto(
                savedCompany.getId(),
                savedCompany.getName(),
                savedCompany.getDescription(),
                savedCompany.getAddress(),
                savedCompany.getLogo()
        );
    }

    @Override
    public CompanyResponseDto deleteCompanyById(Long id) {
        Company company = companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        companyRepository.delete(company);
        return new CompanyResponseDto(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getAddress(),
                company.getLogo()
        );
    }


}
