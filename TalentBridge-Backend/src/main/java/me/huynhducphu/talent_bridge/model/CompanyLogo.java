package me.huynhducphu.talent_bridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String logoUrl;
}
