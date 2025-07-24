package me.huynhducphu.talent_bridge.controller;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 7/21/2025
 **/
@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/emails/job-recommendation/{email}")
    public ResponseEntity<String> sendJobMail(@PathVariable String email) {
        try {
            emailService.sendJobNotificationManually(email);
            return ResponseEntity.ok("Gửi email thành công!");
        } catch (Exception ex) {
            return ResponseEntity
                    .status(500)
                    .body("Gửi email thất bại: " + ex.getMessage());
        }
    }
}
