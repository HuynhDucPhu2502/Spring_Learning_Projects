package me.huynhducphu.talent_bridge.model;

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
public class SessionMeta {

    private String deviceName;
    private String deviceType;
    private String userAgent;
    private Instant loginAt;

}
