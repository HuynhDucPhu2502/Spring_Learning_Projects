package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.model.ApiResponse;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.service.CompanyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Admin 6/12/2025
 **/
@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    @ApiMessage(value = "Tạo công ty")
    public ResponseEntity<?> saveCompany(@Valid @RequestBody CompanyRequestDto companyRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(companyService.saveCompany(companyRequestDto));
    }


    @GetMapping
    @ApiMessage(value = "Lấy danh sách công ty")
    public ResponseEntity<?> findAllCompanies(
            @Filter Specification<Company> spec,
            Pageable pageable
    ) {
        Page<Company> page = companyService.findAllCompany(spec, pageable);

        PageResponseDto<Company> res = new PageResponseDto<>(
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
    public ResponseEntity<?> findCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.findCompanyById(id));
    }

    @PutMapping("/{id}")
    @ApiMessage(value = "Cập nhật công ty theo mã")
    public ResponseEntity<?> updateCompany(
            @Valid @RequestBody CompanyRequestDto companyRequestDto,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(companyService.updateCompany(companyRequestDto, id));
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
