package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Admin 6/12/2025
 **/
@Repository
public interface CompanyRepository extends
        JpaRepository<Company, Long>,
        JpaSpecificationExecutor<Company> {
}
