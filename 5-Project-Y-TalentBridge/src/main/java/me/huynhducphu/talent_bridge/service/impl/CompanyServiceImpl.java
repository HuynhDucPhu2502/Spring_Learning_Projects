package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.company.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Admin 6/12/2025
 **/
@Service
@RequiredArgsConstructor
@Transactional
public class CompanyServiceImpl implements me.huynhducphu.talent_bridge.service.CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public CompanyResponseDto saveCompany(CompanyRequestDto companyRequestDto) {
        Company company = new Company(
                null,
                companyRequestDto.getName(),
                companyRequestDto.getDescription(),
                companyRequestDto.getAddress(),
                companyRequestDto.getLogo(),
                null,
                null
        );

        Company savedCompany = companyRepository.saveAndFlush(company);

        return mapToResponseDto(savedCompany);
    }

    @Override
    public Page<CompanyResponseDto> findAllCompanies(Specification<Company> spec, Pageable pageable) {
        return companyRepository
                .findAll(spec, pageable)
                .map(this::mapToResponseDto);
    }

    @Override
    public CompanyResponseDto findCompanyById(Long id) {
        return companyRepository
                .findById(id)
                .map(this::mapToResponseDto)
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

        return mapToResponseDto(savedCompany);
    }

    @Override
    public CompanyResponseDto deleteCompanyById(Long id) {
        Company company = companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng"));

        userRepository.detachUsersFromCompany(company);

        companyRepository.delete(company);
        return mapToResponseDto(company);
    }

    private CompanyResponseDto mapToResponseDto(Company company) {
        return new CompanyResponseDto(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getAddress(),
                company.getLogo()
        );
    }


}
