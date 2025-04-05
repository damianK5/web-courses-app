package com.example.backend.service;

import com.example.backend.model.Enrollment;
import com.example.backend.repo.EnrollmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    private final EnrollmentRepo enrollmentRepo;

    @Autowired
    public EnrollmentService(EnrollmentRepo enrollmentRepo) {
        this.enrollmentRepo = enrollmentRepo;
    }

    public Enrollment addEnrollment(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    public List<Enrollment> findAllEnrollments() {
        return enrollmentRepo.findAll();
    }

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
