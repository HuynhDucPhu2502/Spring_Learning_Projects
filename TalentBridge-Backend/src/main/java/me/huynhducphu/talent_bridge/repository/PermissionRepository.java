package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Admin 7/10/2025
 **/
@Repository
public interface PermissionRepository extends
        JpaRepository<Permission, Long>,
        JpaSpecificationExecutor<Permission> {

    @Query("SELECT DISTINCT p.module FROM Permission p")
    List<String> findDistinctModules();
    
}
