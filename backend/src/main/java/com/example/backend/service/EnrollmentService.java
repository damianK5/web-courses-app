package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.*;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.EnrollmentRepo;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepo enrollmentRepo;
    private final UserRepo userRepo;
    private final CourseRepo courseRepo;

    @Autowired
    public EnrollmentService(EnrollmentRepo enrollmentRepo,  UserRepo userRepo, CourseRepo courseRepo) {
        this.enrollmentRepo = enrollmentRepo;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
    }

    public Enrollment addEnrollment(EnrollmentRequestDTO enrollment) {


        User user = userRepo.findById(enrollment.getUser_id()).orElseThrow(()->new ResourceNotFoundException("User with id: " +enrollment.getUser_id() + " not found"));
        Course course = courseRepo.findById(enrollment.getCourse_id()).orElseThrow(() ->new ResourceNotFoundException("Course with id: " + enrollment.getCourse_id()+ " not found") );

        boolean exists = enrollmentRepo.existsByUserAndCourse(user, course);
        if (exists) {
            throw new IllegalStateException("Enrollment already exists for this user and course.");
        }

        Enrollment newEnrollment = Enrollment.builder()
            .user(user)
            .course(course)
            .confirmed(enrollment.getConfirmed())
            .type(enrollment.getType())
            .groupNumber(1)
            .build();

        return enrollmentRepo.save(newEnrollment);
    }

    public List<Enrollment> findAllEnrollments() {
        return enrollmentRepo.findAll();
    }
    public List<Enrollment> findEnrollmentsByUser(long id) {return enrollmentRepo.getEnrollmentsByUser(id);}
    public List<Enrollment> findEnrollmentsByCourse(long id) {return enrollmentRepo.getEnrollmentsByCourse(id);}
    public Enrollment updateEnrollment(EnrollmentRequestDTO enrollment) {
        EnrollmentId id = new EnrollmentId(enrollment.getUser_id(), enrollment.getCourse_id());
        Enrollment existing = enrollmentRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Enrollment with user_id: " + id.getUser() + " and course_id:" +id.getCourse()+ " not found"));
        existing.setConfirmed(enrollment.getConfirmed());
        existing.setType(enrollment.getType());
        existing.setGroupNumber(1);
        return enrollmentRepo.save(existing);
    }
    public Enrollment findEnrollmentById(EnrollmentId id) {
        return enrollmentRepo.findById(id).orElse(null);
    }
    public void deleteEnrollment(EnrollmentId id) {
        enrollmentRepo.deleteById(id);
    }
}
