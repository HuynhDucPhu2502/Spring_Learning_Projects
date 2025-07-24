package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.subscriber.DefaultSubscriberRequestDto;
import me.huynhducphu.talent_bridge.dto.response.subscriber.DefaultSubscriberResponseDto;

/**
 * Admin 7/24/2025
 **/
public interface SubscriberService {
    DefaultSubscriberResponseDto saveSelfSubscriber(
            DefaultSubscriberRequestDto defaultSubscriberRequestDto
    );

    DefaultSubscriberResponseDto findSelfSubscriber();

    DefaultSubscriberResponseDto updateSelfSubscriber(
            DefaultSubscriberRequestDto defaultSubscriberRequestDto
    );

    void deleteSelfSubscriber();
}
