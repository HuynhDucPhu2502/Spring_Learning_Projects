package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 6/25/2025
 **/
@Repository
public interface JobRepository extends
        JpaRepository<Job, Long>,
        JpaSpecificationExecutor<Job> {

    List<Job> findByCompanyId(Long id);

    Long countByCompanyId(Long id);


}
