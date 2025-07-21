package me.huynhducphu.talent_bridge.service;

import me.huynhducphu.talent_bridge.dto.request.MailRequestDto;

/**
 * Admin 7/21/2025
 **/
public interface EmailService {
    void sendSimpleEmail(MailRequestDto mailRequestDto);
}
