package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.DefaultSkillResponseDto;
import me.huynhducphu.talent_bridge.model.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Admin 6/23/2025
 **/
public interface SkillService {
    DefaultSkillResponseDto saveSkill(CreateSkillRequestDto createSkillRequestDto);

    Page<DefaultSkillResponseDto> findAllSkills(
            Specification<Skill> spec,
            Pageable pageable);

    DefaultSkillResponseDto findSkillById(Long id);

    DefaultSkillResponseDto updateSkillById(UpdateSkillResponseDto updateSkillResponseDto);

    DefaultSkillResponseDto deleteSkillById(Long id);
}
