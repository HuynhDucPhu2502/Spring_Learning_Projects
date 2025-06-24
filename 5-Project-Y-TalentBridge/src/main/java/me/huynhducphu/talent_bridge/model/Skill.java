package me.huynhducphu.talent_bridge.model;

import jakarta.persistence.*;
import lombok.*;
import me.huynhducphu.talent_bridge.model.common.BaseEntity;

import java.util.List;

/**
 * Admin 6/22/2025
 **/
@Entity
@Table(name = "skills")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Skill extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "skills")
    @ToString.Exclude
    private List<Job> jobs;
}
