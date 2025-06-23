package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.skill.CreateSkillRequestDto;
import me.huynhducphu.talent_bridge.dto.request.skill.UpdateSkillResponseDto;
import me.huynhducphu.talent_bridge.dto.response.skill.SkillResponseDto;
import me.huynhducphu.talent_bridge.exception.custom.ResourceAlreadyExistsException;
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
    public SkillResponseDto saveSkill(CreateSkillRequestDto createSkillRequestDto) {

        if (skillRepository.existsByName(createSkillRequestDto.getName()))
            throw new ResourceAlreadyExistsException("Kỹ năng này đã tồn tại");

        Skill skill = new Skill();
        skill.setName(createSkillRequestDto.getName());
        Skill savedSkill = skillRepository.saveAndFlush(skill);

        return mapToResponseDto(savedSkill);
    }

    @Override
    public Page<SkillResponseDto> findAllSkills(
            Specification<Skill> spec,
            Pageable pageable) {
        return skillRepository
                .findAll(spec, pageable)
                .map(this::mapToResponseDto);
    }

    @Override
    public SkillResponseDto findSkillById(Long id) {
        return skillRepository
                .findById(id)
                .map(this::mapToResponseDto)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kỹ năng"));
    }


    @Override
    public SkillResponseDto updateSkillById(UpdateSkillResponseDto updateSkillResponseDto) {

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
    public SkillResponseDto deleteSkillById(Long id) {
        Skill skill = skillRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy kỹ năng"));


        skillRepository.delete(skill);

        return mapToResponseDto(skill);
    }


    private SkillResponseDto mapToResponseDto(Skill skill) {
        return new SkillResponseDto(
                skill.getId(),
                skill.getName()
        );
    }


}
