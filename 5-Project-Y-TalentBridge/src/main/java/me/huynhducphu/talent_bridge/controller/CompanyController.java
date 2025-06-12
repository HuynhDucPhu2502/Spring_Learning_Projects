package me.huynhducphu.talent_bridge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.CompanyRequestDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.model.ApiResponse;
import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.service.CompanyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public ResponseEntity<?> saveCompany(@Valid @RequestBody CompanyRequestDto companyRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                "Tạo công ty",
                                companyService.saveCompany(companyRequestDto)
                        )
                );
    }


    @GetMapping
    public ResponseEntity<?> findAllCompanies(
            @RequestParam(value = "current", required = false) Optional<String> currentOptional,
            @RequestParam(value = "pageSize", required = false) Optional<String> pageSizeOptional
    ) {
        int current = currentOptional
                .map(x -> Integer.parseInt(x) - 1)
                .orElse(0);
        int pageSize = pageSizeOptional
                .map(Integer::parseInt)
                .orElse(5);

        Page<Company> page = companyService.findAllCompany(PageRequest.of(current, pageSize));

        PageResponseDto<Company> res = new PageResponseDto<>(
                page.getContent(),
                page.getNumber() + 1,
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy danh sách công ty trang " + (current + 1),
                        res
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Lấy công ty theo mã",
                        companyService.findCompanyById(id)
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(
            @Valid @RequestBody CompanyRequestDto companyRequestDto,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Cập nhật công ty",
                        companyService.updateCompany(companyRequestDto, id)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Xóa công ty",
                        companyService.deleteCompanyById(id)
                )
        );
    }


}
