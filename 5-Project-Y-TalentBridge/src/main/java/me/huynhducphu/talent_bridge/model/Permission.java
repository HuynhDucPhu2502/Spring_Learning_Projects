package me.huynhducphu.talent_bridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import me.huynhducphu.talent_bridge.model.common.BaseEntity;

import java.util.Set;

/**
 * Admin 7/10/2025
 **/
@Entity
@Table(name = "permissions")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Permission extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "api_path", nullable = false)
    private String apiPath;

    @Column(nullable = false)
    private String method;

    @Column(nullable = false)
    private String module;

    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles;

    public Permission(String name, String apiPath, String method, String module) {
        this.name = name;
        this.apiPath = apiPath;
        this.method = method;
        this.module = module;
    }
}
