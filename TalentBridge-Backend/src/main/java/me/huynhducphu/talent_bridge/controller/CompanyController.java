package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.company.DefaultCompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.ApiResponse;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyExtendedResponseDto;
import me.huynhducphu.talent_bridge.dto.response.company.DefaultCompanyResponseDto;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.service.CompanyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Company")
@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    @ApiMessage(value = "Tạo công ty")
    public ResponseEntity<?> saveCompany(
            @Valid @RequestPart("company") DefaultCompanyRequestDto defaultCompanyRequestDto,
            @RequestPart(value = "logoFile", required = false) MultipartFile logoFile
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(companyService.saveCompany(defaultCompanyRequestDto, logoFile));
    }

    @PutMapping(value = "/{id}")
    @ApiMessage(value = "Cập nhật công ty theo mã")
    public ResponseEntity<?> updateCompany(
            @Valid @RequestPart("company") DefaultCompanyRequestDto defaultCompanyRequestDto,
            @RequestPart(value = "logoFile", required = false) MultipartFile logoFile,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(companyService.updateCompany(defaultCompanyRequestDto, id, logoFile));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách công ty")
    public ResponseEntity<?> findAllCompanies(
            @Filter Specification<Company> spec,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        Page<DefaultCompanyResponseDto> page = companyService.findAllCompanies(spec, pageable);

        PageResponseDto<DefaultCompanyResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/with-jobs-count")
    @ApiMessage(value = "Lấy danh sách công ty")
    public ResponseEntity<?> findAllCompaniesWithJobsCount(
            @Filter Specification<Company> spec,
            @PageableDefault(size = 9) Pageable pageable
    ) {
        Page<DefaultCompanyExtendedResponseDto> page = companyService.findAllCompaniesWithJobsCount(spec, pageable);

        PageResponseDto<DefaultCompanyExtendedResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy công ty theo mã")
    public ResponseEntity<DefaultCompanyResponseDto> findCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.findCompanyById(id));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa công ty theo mã")
    public ResponseEntity<?> deleteCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Xóa công ty",
                        companyService.deleteCompanyById(id)
                )
        );
    }
}
