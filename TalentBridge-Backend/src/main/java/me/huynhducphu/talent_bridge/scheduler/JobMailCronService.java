package me.huynhducphu.talent_bridge.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.huynhducphu.talent_bridge.model.Subscriber;
import me.huynhducphu.talent_bridge.repository.SubscriberRepository;
import me.huynhducphu.talent_bridge.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 7/24/2025
 **/
@Slf4j
@Service
@RequiredArgsConstructor
public class JobMailCronService {

    private final SubscriberRepository subscriberRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 8 * * ?")
    public void sendJobRecommendationToAllUsers() {
        List<Subscriber> subscribers = subscriberRepository.findAll();
        int sent = 0, failed = 0;

        for (Subscriber subscriber : subscribers) {
            try {
                emailService.sendJobNotificationForSubscriber(subscriber);
                sent++;
            } catch (Exception ex) {
                failed++;
            }
        }

        log.info("Đã gửi job mail cho {} users, thất bại {}", sent, failed);
    }
}
