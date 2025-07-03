package me.huynhducphu.talent_bridge.repository;


import me.huynhducphu.talent_bridge.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Admin 6/30/2025
 **/
public interface ResumeRepository extends
        JpaRepository<Resume, Long>,
        JpaSpecificationExecutor<Resume> {

    boolean existsByUserIdAndJobId(Long userId, Long jobId);

}
