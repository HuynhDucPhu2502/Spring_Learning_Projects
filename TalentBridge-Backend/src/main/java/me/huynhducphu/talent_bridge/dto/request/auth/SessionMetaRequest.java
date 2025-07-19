package me.huynhducphu.talent_bridge.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 7/19/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionMetaRequest {

    private String deviceName;
    private String deviceType;
    private String userAgent;

}
