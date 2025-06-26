package me.huynhducphu.talent_bridge.model;

import jakarta.persistence.*;
import lombok.*;
import me.huynhducphu.talent_bridge.model.common.BaseEntity;
import me.huynhducphu.talent_bridge.model.constant.Level;

import java.time.Instant;
import java.util.List;

/**
 * Admin 6/22/2025
 **/
@Entity
@Table(name = "jobs")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String name;

    private String location;

    private Double salary;

    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    private Instant startDate;

    private Instant endDate;

    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @ToString.Exclude
    private Company company;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "job_skill",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;

    public Job(String name, String location, Double salary, Integer quantity, Level level, String description, Instant startDate, Instant endDate, Boolean active) {
        this.name = name;
        this.location = location;
        this.salary = salary;
        this.quantity = quantity;
        this.level = level;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }
}
