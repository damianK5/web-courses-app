package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.model.User;
import com.example.backend.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepo courseRepo;

    @Autowired
    public CourseService(CourseRepo courseRepo)
    {
        this.courseRepo = courseRepo;
    }

    public Course addCoure(Course course) {
        return courseRepo.save(course);
    }

    public List<Course> findAllCourses() {
        return courseRepo.findAll();
    }

    public Course updateCourse(Course course) {
        return courseRepo.save(course);
    }

    public Course findCourseById(Long id) {
        return courseRepo.findById(id).orElse(null);
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }
}
