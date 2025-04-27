package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Course;
import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
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

    public Enrollment addEnrollment(Enrollment enrollment) {

        User user = userRepo.findById(enrollment.getUser().getId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +enrollment.getUser().getId() + " not found"));
        Course course = courseRepo.findById(enrollment.getCourse().getId()).orElseThrow(() ->new ResourceNotFoundException("Course with id: " + enrollment.getCourse().getId()+ " not found") );

        Enrollment newEnrollment = Enrollment.builder()
            .user(user)
            .course(course)
            .confirmed(enrollment.getConfirmed())
            .type(enrollment.getType())
            .build();

        return enrollmentRepo.save(newEnrollment);
    }

    public List<Enrollment> findAllEnrollments() {
        return enrollmentRepo.findAll();
    }
    public List<Enrollment> findEnrollmentsByUser(long id) {return enrollmentRepo.getEnrollmentsByUser(id);}
    public List<Enrollment> findEnrollmentsByCourse(long id) {return enrollmentRepo.getEnrollmentsByCourse(id);}
    public Enrollment updateEnrollment(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }
    public Enrollment findEnrollmentById(Long id) {
        return enrollmentRepo.findById(id).orElse(null);
    }
    public void deleteEnrollment(Long id) {
        enrollmentRepo.deleteById(id);
    }
}
