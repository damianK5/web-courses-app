package com.example.backend.repo;

import com.example.backend.model.Admission;
import com.example.backend.model.Course;
import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdmissionRepo extends JpaRepository<Admission, Long> {

    @Query("select a from Admission a where a.homework.id = ?1")
    public List<Admission> getAdmissionsByHomework(@Param("homework_id") long id);

    @Query("select a from Admission a where a.user.id = ?1")
    public List<Admission> getAdmissionsByUser(@Param("user_id") long id);

    @Query("select e from Admission e where e.course.id = ?1")
    public List<Admission> getAdmissionsByCourse(@Param("course_id") long id);
}
