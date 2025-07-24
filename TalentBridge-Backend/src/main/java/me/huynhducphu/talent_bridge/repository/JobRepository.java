package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

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

    default Page<Job> findByCompanyId(
            Long id,
            Specification<Job> filterSpec,
            Pageable pageable
    ) {
        Specification<Job> userSpec = (root, q, cb) ->
                cb.equal(root.get("company").get("id"), id);

        Specification<Job> combined = userSpec.and(filterSpec);

        return findAll(combined, pageable);
    }

    List<Job> findDistinctTop3BySkills_NameInOrderByCreatedAtDesc(List<String> skillNames);


}
