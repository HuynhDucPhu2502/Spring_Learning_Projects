package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.company.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.company.CompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.model.CompanyLogo;
import me.huynhducphu.talent_bridge.repository.CompanyLogoRepository;
import me.huynhducphu.talent_bridge.repository.CompanyRepository;
import me.huynhducphu.talent_bridge.repository.UserRepository;
import me.huynhducphu.talent_bridge.util.ImageDataUrlParser;
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
    private final CompanyLogoRepository companyLogoRepository;
    private final UserRepository userRepository;

    @Override
    public CompanyResponseDto saveCompany(CompanyRequestDto companyRequestDto) {
        Company company = new Company(
                companyRequestDto.getName(),
                companyRequestDto.getDescription(),
                companyRequestDto.getAddress()
        );

        if (companyRequestDto.getLogo() != null) {
            ImageDataUrlParser.ParsedImage parsedImage =
                    ImageDataUrlParser.parse(companyRequestDto.getLogo());

            CompanyLogo companyLogo = new CompanyLogo();
            companyLogo.setCompany(company);
            companyLogo.setLogo(parsedImage.getData());
            companyLogo.setContentType(parsedImage.getContentType());

            company.setCompanyLogo(companyLogo);
        }

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

        if (companyRequestDto.getLogo() != null) {
            ImageDataUrlParser.ParsedImage parsedImage =
                    ImageDataUrlParser.parse(companyRequestDto.getLogo());

            CompanyLogo companyLogo = company.getCompanyLogo();
            if (companyLogo == null) {
                companyLogo = new CompanyLogo();
                companyLogo.setCompany(company);
                company.setCompanyLogo(companyLogo);
            }

            companyLogo.setContentType(parsedImage.getContentType());
            companyLogo.setLogo(parsedImage.getData());
        }

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
        String logo = null;
        if (company.getCompanyLogo() != null) {
            CompanyLogo companyLogo = company.getCompanyLogo();
            logo = ImageDataUrlParser.toBase64DataUrl(
                    companyLogo.getContentType(),
                    companyLogo.getLogo()
            );
        }

        return new CompanyResponseDto(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getAddress(),
                logo,
                company.getCreatedAt().toString(),
                company.getUpdatedAt().toString()
        );
    }


}
