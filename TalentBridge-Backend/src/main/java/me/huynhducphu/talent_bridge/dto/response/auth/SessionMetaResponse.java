package me.huynhducphu.talent_bridge.dto.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Admin 7/19/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionMetaResponse {

    private String sessionId;
    private String deviceName;
    private String deviceType;
    private String userAgent;
    private Instant loginAt;
    private boolean current;

}
