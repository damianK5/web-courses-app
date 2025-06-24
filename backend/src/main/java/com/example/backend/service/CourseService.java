package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import com.example.backend.repo.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final AdmissionRepo admissionRepo;
    private final AssetRepo assetRepo;
    private final CourseRepo courseRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final HomeworkRepo homeworkRepo;

    @Autowired
    public CourseService(
            AdmissionRepo admissionRepo,
            AssetRepo assetRepo,
            CourseRepo courseRepo,
            EnrollmentRepo enrollmentRepo,
            HomeworkRepo homeworkRepo
    ) {
        this.admissionRepo = admissionRepo;
        this.assetRepo = assetRepo;
        this.courseRepo = courseRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.homeworkRepo = homeworkRepo;
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

    @Transactional
    public void deleteCourse(Long id) {
        admissionRepo.deleteAll(admissionRepo.getAdmissionsByCourse(id));
        assetRepo.deleteAll(assetRepo.getAssetsByCourse(id));
        enrollmentRepo.deleteAll(enrollmentRepo.getEnrollmentsByCourse(id));
        homeworkRepo.deleteAll(homeworkRepo.getHomeworksByCourse(id));

        courseRepo.deleteById(id);
    }
}
