package me.huynhducphu.talent_bridge.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/12/2025
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanyResponseDto {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String logo;
    
}
