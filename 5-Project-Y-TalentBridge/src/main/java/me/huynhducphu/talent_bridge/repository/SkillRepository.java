package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Admin 6/23/2025
 **/
public interface SkillRepository extends
        JpaRepository<Skill, Long>,
        JpaSpecificationExecutor<Skill> {

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);

}
