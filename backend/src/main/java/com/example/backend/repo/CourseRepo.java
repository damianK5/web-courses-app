package com.example.backend.repo;

import com.example.backend.model.Course;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course, Long> {
}
