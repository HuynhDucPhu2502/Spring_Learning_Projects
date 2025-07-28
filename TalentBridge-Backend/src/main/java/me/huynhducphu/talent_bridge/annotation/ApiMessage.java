package me.huynhducphu.talent_bridge.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation dùng để chuẩn hóa thông điệp phản hồi từ API.
 * <p>
 * Khi được gắn vào một method của controller, hệ thống sẽ tự động
 * chèn giá trị `message` vào phần phản hồi JSON theo định dạng chuẩn:
 * <p>
 * {
 * "message": "...",
 * "errorCode": "...",
 * "data": { ... }
 * }
 * <p>
 * Annotation này sẽ được xử lý qua @ControllerAdvice hoặc AOP tùy theo cách bạn triển khai.
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface ApiMessage {
    String value();
}


