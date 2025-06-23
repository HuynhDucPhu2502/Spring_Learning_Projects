package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.SkillResponseDto;
import me.huynhducphu.talent_bridge.model.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 6/23/2025
 **/
public interface SkillService {
    SkillResponseDto saveSkill(CreateSkillRequestDto createSkillRequestDto);

    Page<SkillResponseDto> findAllSkills(
            Specification<Skill> spec,
            Pageable pageable);

    SkillResponseDto findSkillById(Long id);

    SkillResponseDto updateSkillById(UpdateSkillResponseDto updateSkillResponseDto);

    SkillResponseDto deleteSkillById(Long id);
}
