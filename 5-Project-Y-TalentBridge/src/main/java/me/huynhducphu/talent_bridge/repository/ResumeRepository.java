package me.huynhducphu.talent_bridge.repository;


import me.huynhducphu.talent_bridge.model.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Admin 6/30/2025
 **/
@Repository
public interface ResumeRepository extends
        JpaRepository<Resume, Long>,
        JpaSpecificationExecutor<Resume> {

    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    default Page<Resume> findByUserId(
            Long userId,
            Specification<Resume> filterSpec,
            Pageable pageable
    ) {
        Specification<Resume> userSpec = (root, q, cb) ->
                cb.equal(root.get("user").get("id"), userId);

        Specification<Resume> combined = userSpec.and(filterSpec);

        return findAll(combined, pageable);
    }

    Optional<Resume> findByUserIdAndJobId(Long userId, Long jobId);

}
