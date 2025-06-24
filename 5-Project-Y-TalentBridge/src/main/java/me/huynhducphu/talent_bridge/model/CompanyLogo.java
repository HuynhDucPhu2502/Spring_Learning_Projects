package me.huynhducphu.talent_bridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 6/24/2025
 **/
@Entity
@Table(name = "company_logos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyLogo {

    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] logo;

    private String contentType;

}
