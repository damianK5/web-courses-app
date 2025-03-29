package com.example.backend.repo;

import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {
}
