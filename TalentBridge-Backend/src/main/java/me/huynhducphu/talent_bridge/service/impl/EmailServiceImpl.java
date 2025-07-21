package me.huynhducphu.talent_bridge.service.impl;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.MailRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Admin 7/21/2025
 **/
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements me.huynhducphu.talent_bridge.service.EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String sender;

    @Override
    public void sendSimpleEmail(MailRequestDto mailRequestDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(mailRequestDto.getTo());
        message.setSubject(mailRequestDto.getSubject());
        message.setText(mailRequestDto.getBody());
        mailSender.send(message);
    }


}
