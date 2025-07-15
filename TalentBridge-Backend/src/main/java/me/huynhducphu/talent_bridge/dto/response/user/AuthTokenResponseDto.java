package me.huynhducphu.talent_bridge.dto.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Admin 6/9/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonPropertyOrder({"user", "accessToken"})

public class AuthTokenResponseDto {

    @JsonProperty("user")
    private UserInformation userInformation;
    private String accessToken;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class UserInformation {
        private String email;
        private String name;
        private Long id;
        private List<String> permissions;
    }

}
