package me.huynhducphu.talent_bridge.dto.response.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.dto.response.user.UserSessionResponseDto;

/**
 * Admin 6/9/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonPropertyOrder({"user", "accessToken"})
public class AuthTokenResponseDto {

    @JsonProperty("user")
    private UserSessionResponseDto userSessionResponseDto;
    private String accessToken;

}
