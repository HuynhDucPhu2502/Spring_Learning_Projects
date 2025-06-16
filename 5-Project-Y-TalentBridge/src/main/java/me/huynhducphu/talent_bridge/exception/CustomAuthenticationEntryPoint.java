package me.huynhducphu.talent_bridge.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import me.huynhducphu.talent_bridge.dto.response.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Admin 6/9/2025
 **/
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final AuthenticationEntryPoint delegate = new BearerTokenAuthenticationEntryPoint();
    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        delegate.commence(request, response, authException);

        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);

        ApiResponse<?> apiResponse = new ApiResponse<>(
                "Token không hợp lệ (không đúng định dạng, hết hạn)",
                "UNAUTHORIZED"
        );

        objectMapper.writeValue(response.getWriter(), apiResponse);
    }


}
