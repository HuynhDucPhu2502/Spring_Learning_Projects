package me.huynhducphu.talent_bridge.controller;

import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.annotation.ApiMessage;
import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.PageResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.SkillResponseDto;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.service.SkillService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 6/23/2025
 **/
@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    @ApiMessage(value = "Tạo kỹ năng")
    public ResponseEntity<?> saveSkill(@Valid @RequestBody CreateSkillRequestDto createSkillRequestDto) {
        return ResponseEntity
                .ok(skillService.saveSkill(createSkillRequestDto));
    }

    @GetMapping
    @ApiMessage(value = "Lấy danh sách kỹ năng")
    public ResponseEntity<?> findAllSkills(
            @Filter Specification<Skill> spec,
            @PageableDefault(size = 5) Pageable pageable) {

        Page<SkillResponseDto> page = skillService.findAllSkills(spec, pageable);

        PageResponseDto<SkillResponseDto> res = new PageResponseDto<>(
                page.getContent(),
                pageable.getPageNumber() + 1,
                pageable.getPageSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    @ApiMessage(value = "Lấy kỹ năng theo mã")
    public ResponseEntity<?> findSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.findSkillById(id));
    }


    @PutMapping
    @ApiMessage(value = "Cập nhật kỹ năng")
    public ResponseEntity<?> updateSkill(
            @Valid @RequestBody UpdateSkillResponseDto updateSkillResponseDto) {
        return ResponseEntity.ok(skillService.updateSkillById(updateSkillResponseDto));

    }

    @DeleteMapping("/{id}")
    @ApiMessage(value = "Xóa kỹ năng")
    public ResponseEntity<?> deleteSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.deleteSkillById(id));
    }


}
