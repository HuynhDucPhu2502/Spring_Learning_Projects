package me.huynhducphu.talent_bridge.exception.custom;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Admin 6/23/2025
 **/
public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String message) {
        super(message);
    }
}
