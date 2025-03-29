package com.example.backend.repo;

import com.example.backend.model.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeworkRepo extends JpaRepository<Homework, Long> {
}
