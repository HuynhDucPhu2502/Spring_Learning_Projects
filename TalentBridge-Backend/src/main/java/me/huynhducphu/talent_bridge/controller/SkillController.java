package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.DefaultSkillResponseDto;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.service.SkillService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/23/2025
 **/
@Tag(name = "Skill")
@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    @ApiMessage(value = "Tạo Skill")
    @PreAuthorize("hasAuthority('POST /skills')")
    @Operation(
            summary = "Tạo Skill",
            description = "Yêu cầu quyền: <b>POST /skills</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSkillResponseDto> saveSkill(@Valid @RequestBody CreateSkillRequestDto createSkillRequestDto) {
        return ResponseEntity
                .ok(skillService.saveSkill(createSkillRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách Skill")
    @PreAuthorize("hasAuthority('GET /skills') OR isAnonymous()")
    @Operation(
            summary = "Lấy danh sách Skill",
            description = "Yêu cầu quyền: <b>GET /skills</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<PageResponseDto<DefaultSkillResponseDto>> findAllSkills(
            @Filter Specification<Skill> spec,
            @PageableDefault(size = 5) Pageable pageable) {

        Page<DefaultSkillResponseDto> page = skillService.findAllSkills(spec, pageable);

        PageResponseDto<DefaultSkillResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    // NON USE
    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy Skill theo id")
    @PreAuthorize("hasAuthority('GET /skills/{id}') OR isAnonymous()")
    @Operation(
            summary = "Lấy Skill theo id",
            description = "Yêu cầu quyền: <b>GET /skills/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSkillResponseDto> findSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.findSkillById(id));
    }


    @PutMapping
    @ApiMessage(value = "Cập nhật Skill")
    @PreAuthorize("hasAuthority('PUT /skills')")
    @Operation(
            summary = "Cập nhật Skill",
            description = "Yêu cầu quyền: <b>PUT /skills</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSkillResponseDto> updateSkill(
            @Valid @RequestBody UpdateSkillResponseDto updateSkillResponseDto) {
        return ResponseEntity.ok(skillService.updateSkillById(updateSkillResponseDto));

    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa Skill theo id")
    @PreAuthorize("hasAuthority('DELETE /skills/{id}')")
    @Operation(
            summary = "Xóa Skill theo id",
            description = "Yêu cầu quyền: <b>DELETE /skills/{id}</b>",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<DefaultSkillResponseDto> deleteSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.deleteSkillById(id));
    }


}
