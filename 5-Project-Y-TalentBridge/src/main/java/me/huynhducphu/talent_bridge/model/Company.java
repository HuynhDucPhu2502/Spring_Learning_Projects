package me.huynhducphu.talent_bridge.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.*;
import me.huynhducphu.talent_bridge.model.common.BaseEntity;

import java.util.List;

@Entity
@Table(name = "companies")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonPropertyOrder({"id", "name", "description", "address", "logoUrl"})
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    private String address;

    @OneToOne(mappedBy = "company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private CompanyLogo companyLogo;

    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<User> users;

    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Job> jobs;

    public Company(String name, String description, String address) {
        this.name = name;
        this.description = description;
        this.address = address;
    }
}
