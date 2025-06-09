package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.*;
import com.example.backend.repo.AdmissionRepo;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.HomeworkRepo;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionService {
    private final AdmissionRepo admissionRepo;
    private final CourseRepo courseRepo;
    private final HomeworkRepo homeworkRepo;
    private final UserRepo userRepo;

    @Autowired
    public AdmissionService(AdmissionRepo admissionRepo, CourseRepo courseRepo, HomeworkRepo homeworkRepo, UserRepo userRepo) {
        this.admissionRepo = admissionRepo;
        this.courseRepo = courseRepo;
        this.homeworkRepo = homeworkRepo;
        this.userRepo = userRepo;
    }

    public Admission addAdmission(AdmissionRequestDTO admission) {

        Course course = courseRepo.findById(admission.getCourseId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getCourseId() + " not found"));;;
        Homework homework = homeworkRepo.findById(admission.getHomeworkId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getHomeworkId() + " not found"));
        User user = userRepo.findById(admission.getUserId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getUserId() + " not found"));

        Admission admission1 = new Admission();
        admission1.setAdmissionDate(admission.getAdmissionDate());
        admission1.setFilepath(admission.getFilepath());
        admission1.setGrade(admission.getGrade());
        admission1.setStudentComment(admission.getStudentComment());
        admission1.setTeacherComment(admission.getTeacherComment());
        admission1.setCourse(course);
        admission1.setHomework(homework);
        admission1.setUser(user);
        return admissionRepo.save(admission1);
    }

    public List<Admission> findAllAdmissions() {
        return admissionRepo.findAll();
    }

    public List<Admission> findAdmissionsByHomework(long id) {return admissionRepo.getAdmissionsByHomework(id);}
    public List<Admission> findAdmissionsByUser(long id) {return  admissionRepo.getAdmissionsByUser(id);}
    public Admission updateAdmission(AdmissionRequestDTO admission) {
        Admission existing = admissionRepo.findById(admission.getId()).orElseThrow(() -> new ResourceNotFoundException("Homework with id: " + admission.getId() + " not found"));

        Course course = courseRepo.findById(admission.getCourseId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getCourseId() + " not found"));;;
        Homework homework = homeworkRepo.findById(admission.getHomeworkId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getHomeworkId() + " not found"));
        User user = userRepo.findById(admission.getUserId()).orElseThrow(()->new ResourceNotFoundException("User with id: " +admission.getUserId() + " not found"));

        existing.setAdmissionDate(admission.getAdmissionDate());
        existing.setFilepath(admission.getFilepath());
        existing.setGrade(admission.getGrade());
        existing.setStudentComment(admission.getStudentComment());
        existing.setTeacherComment(admission.getTeacherComment());
        existing.setCourse(course);
        existing.setHomework(homework);
        existing.setUser(user);
        return admissionRepo.save(existing);
    }

    public Admission findAdmissionById(Long id) {
        return admissionRepo.findById(id).orElse(null);
    }

    public void deleteAdmission(Long id) {
        admissionRepo.deleteById(id);
    }
}
