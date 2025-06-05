package me.huynhducphu.project_x.entitiy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * Admin 6/5/2025
 **/
@NoArgsConstructor
@Data
public class ApiResponse<T> {

    private String status;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    private String errorCode;

    public ApiResponse(HttpStatus status, String message, T data, String errorCode) {
        this.status = status.is2xxSuccessful() ? "Success" : "Error";
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.errorCode = (errorCode == null || errorCode.isBlank()) ? "" : errorCode;
    }

    public ApiResponse(HttpStatus status, String message, T data) {
        this.status = status.is2xxSuccessful() ? "Success" : "Error";
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.errorCode = "";
    }


}
