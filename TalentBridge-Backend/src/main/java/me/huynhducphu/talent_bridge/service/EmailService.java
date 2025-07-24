package me.huynhducphu.talent_bridge.service;

import jakarta.mail.MessagingException;
import me.huynhducphu.talent_bridge.model.Subscriber;

/**
 * Admin 7/21/2025
 **/
public interface EmailService {

    void sendJobNotificationForSubscriber(Subscriber subscriber) throws MessagingException;

    void sendJobNotificationManually(String email) throws MessagingException;
}
