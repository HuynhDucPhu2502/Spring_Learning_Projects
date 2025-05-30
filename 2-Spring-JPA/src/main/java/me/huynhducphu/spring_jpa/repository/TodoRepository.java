package me.huynhducphu.spring_jpa.repository;

import me.huynhducphu.spring_jpa.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Admin 5/30/2025
 **/
@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
