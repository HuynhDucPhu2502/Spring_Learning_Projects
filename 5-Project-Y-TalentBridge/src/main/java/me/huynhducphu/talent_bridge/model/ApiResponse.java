package me.huynhducphu.talent_bridge.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/7/2025
 **/
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApiResponse<T> {

    private String message;
    private String errorCode;
    private T data;

    public ApiResponse(String message, T data) {
        this.message = message;
        this.data = data;
        this.errorCode = null;
    }

    public ApiResponse(String message, String errorCode) {
        this.errorCode = errorCode;
        this.message = message;
        this.data = null;
    }
}
