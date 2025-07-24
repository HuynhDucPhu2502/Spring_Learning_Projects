package me.huynhducphu.talent_bridge.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.subscriber.DefaultSubscriberRequestDto;
import me.huynhducphu.talent_bridge.dto.response.subscriber.DefaultSubscriberResponseDto;
import me.huynhducphu.talent_bridge.exception.custom.ResourceAlreadyExistsException;
import me.huynhducphu.talent_bridge.model.Skill;
import me.huynhducphu.talent_bridge.model.Subscriber;
import me.huynhducphu.talent_bridge.repository.SkillRepository;
import me.huynhducphu.talent_bridge.repository.SubscriberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

/**
 * Admin 7/24/2025
 **/
@Service
@Transactional
@RequiredArgsConstructor
public class SubscriberServiceImpl implements me.huynhducphu.talent_bridge.service.SubscriberService {

    private final SubscriberRepository subscribeRepository;
    private final SkillRepository skillRepository;

    @Override
    public DefaultSubscriberResponseDto saveSelfSubscriber(
            DefaultSubscriberRequestDto defaultSubscriberRequestDto
    ) {
        if (getSelfSubscriber() != null)
            throw new ResourceAlreadyExistsException("Người dùng này đã đăng ký rồi");

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Subscriber subscriber = new Subscriber(email);

        if (defaultSubscriberRequestDto.getSkills() != null) {
            List<Long> skillIds = defaultSubscriberRequestDto
                    .getSkills()
                    .stream()
                    .map(s -> s.getId())
                    .toList();
            List<Skill> skills = skillRepository.findAllById(skillIds);

            subscriber.setSkills(skills);
        } else subscriber.setSkills(Collections.emptyList());

        return mapToDefaultSubscriberResponseDto(subscribeRepository.saveAndFlush(subscriber));
    }

    @Override
    public DefaultSubscriberResponseDto findSelfSubscriber() {
        return mapToDefaultSubscriberResponseDto(getSelfSubscriber());
    }

    @Override
    public DefaultSubscriberResponseDto updateSelfSubscriber(
            DefaultSubscriberRequestDto defaultSubscriberRequestDto
    ) {
        Subscriber subscriber = getSelfSubscriber();

        if (subscriber == null)
            throw new EntityNotFoundException("Không tìm thấy đăng ký người dùng này");

        if (defaultSubscriberRequestDto.getSkills() != null) {
            subscriber.getSkills().clear();

            List<Long> skillIds = defaultSubscriberRequestDto
                    .getSkills()
                    .stream()
                    .map(s -> s.getId())
                    .toList();
            List<Skill> skills = skillRepository.findAllById(skillIds);

            subscriber.setSkills(skills);
        } else subscriber.setSkills(Collections.emptyList());

        return mapToDefaultSubscriberResponseDto(subscribeRepository.saveAndFlush(subscriber));
    }

    @Override
    public void deleteSelfSubscriber() {
        Subscriber subscriber = getSelfSubscriber();

        if (subscriber == null)
            throw new EntityNotFoundException("Không tìm thấy đăng ký người dùng này");

        subscriber.setSkills(null);
        subscribeRepository.delete(subscriber);
    }

    private Subscriber getSelfSubscriber() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return subscribeRepository
                .findByEmail(email)
                .orElse(null);
    }

    private DefaultSubscriberResponseDto mapToDefaultSubscriberResponseDto(Subscriber subscriber) {
        if (subscriber == null)
            return null;

        DefaultSubscriberResponseDto res = new DefaultSubscriberResponseDto(
                subscriber.getId(),
                subscriber.getEmail()
        );


        if (subscriber.getSkills() != null) {
            List<DefaultSubscriberResponseDto.SkillDto> skills = subscriber
                    .getSkills()
                    .stream()
                    .map(skill -> new DefaultSubscriberResponseDto.SkillDto(skill.getId(), skill.getName()))
                    .toList();
            res.setSkills(skills);
        } else res.setSkills(Collections.emptyList());

        return res;
    }

}
