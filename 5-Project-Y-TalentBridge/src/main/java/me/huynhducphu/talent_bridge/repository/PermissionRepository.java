package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Admin 7/10/2025
 **/
@Repository
public interface PermissionRepository extends
        JpaRepository<Permission, Long>,
        JpaSpecificationExecutor<Permission> {
}
