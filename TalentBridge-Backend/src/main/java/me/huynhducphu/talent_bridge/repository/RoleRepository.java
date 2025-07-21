package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Admin 7/11/2025
 **/
@Repository
public interface RoleRepository extends
        JpaRepository<Role, Long>,
        JpaSpecificationExecutor<Role> {
    boolean existsByName(String name);

    Optional<Role> findByName(String name);


}
