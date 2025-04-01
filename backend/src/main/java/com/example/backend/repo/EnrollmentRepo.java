package com.example.backend.repo;

import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {

    @Query("select e from Enrollment e where e.user.id = ?1")
    public List<Enrollment> getEnrollmentsByUser(@Param("user_id") long id);

    @Query("select e from Enrollment e where e.course.id = ?1")
    public List<Enrollment> getEnrollmentsByCourse(@Param("course_id") long id);

}
