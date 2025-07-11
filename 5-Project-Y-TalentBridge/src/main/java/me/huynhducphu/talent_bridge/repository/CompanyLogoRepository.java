package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.CompanyLogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Admin 6/24/2025
 **/
@Repository
public interface CompanyLogoRepository extends JpaRepository<CompanyLogo, Long> {
}
