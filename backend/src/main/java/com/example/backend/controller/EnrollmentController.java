package com.example.backend.controller;

import com.example.backend.model.Enrollment;
import com.example.backend.service.EnrollmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.findAllEnrollments();
        return new ResponseEntity<>(enrollments, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Long id) {
        Enrollment enrollment = enrollmentService.findEnrollmentById(id);
        return new ResponseEntity<>(enrollment, HttpStatus.OK);
    }

    @GetMapping("find/user/{id}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByUser(@PathVariable Long id)
    {
        List<Enrollment> enrollments = enrollmentService.findEnrollmentsByUser(id);
        return new ResponseEntity<>(enrollments, HttpStatus.OK);
    }

    @GetMapping("find/course/id")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByCourse(@PathVariable Long id)
    {
        List<Enrollment> enrollments = enrollmentService.findEnrollmentsByCourse(id);
        return new ResponseEntity<>(enrollments, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Enrollment> addEnrollment(@RequestBody Enrollment enrollment) {
        Enrollment newEnrollment = enrollmentService.addEnrollment(enrollment);
        return new ResponseEntity<>(newEnrollment, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Enrollment> updateEnrollment(@RequestBody Enrollment enrollment) {
        Enrollment updatedEnrollment = enrollmentService.updateEnrollment(enrollment);
        return new ResponseEntity<>(updatedEnrollment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
