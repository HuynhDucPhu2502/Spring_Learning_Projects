package me.huynhducphu.talent_bridge.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/21/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MailRequestDto {
    private String to;
    private String subject;
    private String body;
}
