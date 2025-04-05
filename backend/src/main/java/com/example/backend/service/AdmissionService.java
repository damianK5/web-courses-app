package com.example.backend.service;

import com.example.backend.model.Admission;
import com.example.backend.repo.AdmissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionService {
    private final AdmissionRepo admissionRepo;

    @Autowired
    public AdmissionService(AdmissionRepo admissionRepo) {
        this.admissionRepo = admissionRepo;
    }

    public Admission addAdmission(Admission admission) {
        return admissionRepo.save(admission);
    }

    public List<Admission> findAllAdmissions() {
        return admissionRepo.findAll();
    }

    public List<Admission> findAdmissionsByHomework(long id) {return admissionRepo.getAdmissionsByHomework(id);}
    public List<Admission> findAdmissionsByUser(long id) {return  admissionRepo.getAdmissionsByUser(id);}
    public Admission updateAdmission(Admission admission) {
        return admissionRepo.save(admission);
    }

    public Admission findAdmissionById(Long id) {
        return admissionRepo.findById(id).orElse(null);
    }

    public void deleteAdmission(Long id) {
        admissionRepo.deleteById(id);
    }
}
