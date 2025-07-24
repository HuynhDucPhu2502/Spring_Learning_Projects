package me.huynhducphu.talent_bridge.repository;

import me.huynhducphu.talent_bridge.model.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Admin 7/24/2025
 **/
@Repository
public interface SubscriberRepository extends
        JpaRepository<Subscriber, Long>,
        JpaSpecificationExecutor<Subscriber> {

    Optional<Subscriber> findByEmail(String email);
}
