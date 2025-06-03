package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.EnrollmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepo courseRepo;
    private final EnrollmentRepo enrollmentRepo;

    @Autowired
    public CourseService(CourseRepo courseRepo, EnrollmentRepo enrollmentRepo) {
        this.courseRepo = courseRepo;
        this.enrollmentRepo = enrollmentRepo;
    }

    public Course addCourse(Course course) {
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

    public  List<Course> findCourseByUser(Long userId) {
        List<Enrollment> enrollments = enrollmentRepo.getEnrollmentsByUser(userId);
        return enrollments.stream().map(Enrollment::getCourse).collect(Collectors.toList());
    }

    public void deleteCourse(Long id) {
        courseRepo.deleteById(id);
    }
}
