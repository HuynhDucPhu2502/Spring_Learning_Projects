package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Company")
@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    @ApiMessage(value = "Tạo Company")
    @PreAuthorize("hasAuthority('POST /companies')")
    @Operation(
            summary = "Tạo Company",
            description = "Yêu cầu quyền: <b>POST /companies</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> saveCompany(
            @Valid @RequestPart("company") DefaultCompanyRequestDto defaultCompanyRequestDto,
            @RequestPart(value = "logoFile", required = false) MultipartFile logoFile
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(companyService.saveCompany(defaultCompanyRequestDto, logoFile));
    }

    @PutMapping(value = "/{id}")
    @ApiMessage(value = "Cập nhật Company theo id")
    @PreAuthorize("hasAuthority('PUT /companies/{id}')")
    @Operation(
            summary = "Cập nhật Company theo id",
            description = "Yêu cầu quyền: <b>PUT /companies/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> updateCompany(
            @Valid @RequestPart("company") DefaultCompanyRequestDto defaultCompanyRequestDto,
            @RequestPart(value = "logoFile", required = false) MultipartFile logoFile,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(companyService.updateCompany(defaultCompanyRequestDto, id, logoFile));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách Company")
    @PreAuthorize("hasAuthority('GET /companies') OR isAnonymous()")
    @Operation(
            summary = "Lấy danh sách Company",
            description = "Yêu cầu quyền: <b>GET /companies</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
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
    @ApiMessage(value = "Lấy danh sách Company kèm với số lượng nghề")
    @PreAuthorize("hasAuthority('GET /companies/with-jobs-count') OR isAnonymous()")
    @Operation(
            summary = "Lấy danh sách Company kèm với số lượng nghề",
            description = "Yêu cầu quyền: <b>GET /companies/with-jobs-count</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
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
    @ApiMessage(value = "Lấy Company theo id")
    @PreAuthorize("hasAuthority('GET /companies/{id}') OR isAnonymous()")
    @Operation(
            summary = "Lấy Company theo id",
            description = "Yêu cầu quyền: <b>GET /companies/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultCompanyResponseDto> findCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.findCompanyById(id));
    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa company theo id")
    @PreAuthorize("hasAuthority('DELETE /companies/{id}')")
    @Operation(
            summary = "Xóa company theo id",
            description = "Yêu cầu quyền: <b>DELETE /companies/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<?> deleteCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Xóa công ty",
                        companyService.deleteCompanyById(id)
                )
        );
    }
}
