package me.huynhducphu.talent_bridge.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.*;
import me.huynhducphu.talent_bridge.model.common.BaseEntity;
import me.huynhducphu.talent_bridge.model.constant.Gender;

import java.util.List;

/**
 * Admin 6/7/2025
 **/
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonPropertyOrder({"id", "name", "email", "password", "age", "address", "gender", "refreshToken"})
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private Integer age;

    private String address;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String logoUrl;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @ToString.Exclude
    private Company company;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<Resume> resumes;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @ToString.Exclude
    private Role role;

    public User(String email, String name, String password, Integer age, String address, Gender gender) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.age = age;
        this.address = address;
        this.gender = gender;
    }
}

