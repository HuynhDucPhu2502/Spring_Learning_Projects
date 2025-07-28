package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.DefaultSkillResponseDto;
import me.huynhducphu.talent_bridge.advice.exception.ResourceAlreadyExistsException;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.repository.SkillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Admin 6/23/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class SkillServiceImpl implements me.huynhducphu.talent_bridge.service.SkillService {

    private final SkillRepository skillRepository;

    @Override
    public DefaultSkillResponseDto saveSkill(CreateSkillRequestDto createSkillRequestDto) {

        if (skillRepository.existsByName(createSkillRequestDto.getName()))
            throw new ResourceAlreadyExistsException("Kỹ năng này đã tồn tại");

        Skill skill = new Skill();
        skill.setName(createSkillRequestDto.getName());
        Skill savedSkill = skillRepository.saveAndFlush(skill);

        return mapToResponseDto(savedSkill);
    }

    @Override
    public Page<DefaultSkillResponseDto> findAllSkills(
            Specification<Skill> spec,
            Pageable pageable) {
        return skillRepository
                .findAll(spec, pageable)
                .map(this::mapToResponseDto);
    }

    @Override
    public DefaultSkillResponseDto findSkillById(Long id) {
        return skillRepository
                .findById(id)
                .map(this::mapToResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kỹ năng"));
    }


    @Override
    public DefaultSkillResponseDto updateSkillById(UpdateSkillResponseDto updateSkillResponseDto) {

        Skill skill = skillRepository
                .findById(updateSkillResponseDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kỹ năng"));

        if (skillRepository.existsByNameAndIdNot(updateSkillResponseDto.getName(), updateSkillResponseDto.getId()))
            throw new ResourceAlreadyExistsException("Kỹ năng này đã tồn tại");

        skill.setName(updateSkillResponseDto.getName());
        Skill savedSkill = skillRepository.saveAndFlush(skill);

        return mapToResponseDto(savedSkill);
    }

    @Override
    public DefaultSkillResponseDto deleteSkillById(Long id) {
        Skill skill = skillRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kỹ năng"));


        skillRepository.delete(skill);

        return mapToResponseDto(skill);
    }


    private DefaultSkillResponseDto mapToResponseDto(Skill skill) {
        return new DefaultSkillResponseDto(
                skill.getId(),
                skill.getName(),
                skill.getCreatedAt().toString(),
                skill.getUpdatedAt().toString()
        );
    }


}
