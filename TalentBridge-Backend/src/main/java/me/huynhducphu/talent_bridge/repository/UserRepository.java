package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Company;
import me.huynhducphu.talent_bridge.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Admin 6/7/2025
 **/
@Repository
public interface UserRepository extends
        JpaRepository<User, Long>,
        JpaSpecificationExecutor<User> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Modifying
    @Query("UPDATE User u SET u.company = null WHERE u.company = :company")
    void detachUsersFromCompany(@Param("company") Company company);

    @Modifying
    @Query("UPDATE User u SET u.role = null WHERE u.role.id = :roleId")
    void detachUsersFromRole(@Param("roleId") Long roleId);
}
