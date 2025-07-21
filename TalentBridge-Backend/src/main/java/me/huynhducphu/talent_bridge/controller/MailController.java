package me.huynhducphu.talent_bridge.controller;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.request.MailRequestDto;
import me.huynhducphu.talent_bridge.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 7/21/2025
 **/
@RestController
@RequiredArgsConstructor
public class MailController {

    private final EmailService emailService;

    @PostMapping("/send-mail")
    public void sendMail(@RequestBody MailRequestDto mailRequestDto) {
        emailService.sendSimpleEmail(mailRequestDto);
    }
}
