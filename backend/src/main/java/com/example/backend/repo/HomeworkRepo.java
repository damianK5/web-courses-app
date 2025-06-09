package com.example.backend.repo;

import com.example.backend.model.Homework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HomeworkRepo extends JpaRepository<Homework, Long> {

    @Query("select h from Homework h where h.course.id = :course_id")
    public List<Homework> getHomeworksByCourse(@Param("course_id") long id);
}
