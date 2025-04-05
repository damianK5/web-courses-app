package com.example.backend.controller;

import com.example.backend.model.Admission;
import com.example.backend.service.AdmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admission")
public class AdmissionController {
    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Admission>> getAllAdmissions() {
        List<Admission> admissions = admissionService.findAllAdmissions();
        return new ResponseEntity<>(admissions, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Admission> getAdmissionById(@PathVariable Long id) {
        Admission admission = admissionService.findAdmissionById(id);
        return new ResponseEntity<>(admission, HttpStatus.OK);
    }

    @GetMapping("/find/homework/{id}")
    public ResponseEntity<List<Admission>> getAdmissionsByHomework(@PathVariable Long id)
    {
        List<Admission> admissions = admissionService.findAdmissionsByHomework(id);
        return new ResponseEntity<>(admissions, HttpStatus.OK);
    }

    @GetMapping("/find/user/{id}")
    public ResponseEntity<List<Admission>> getAdmissionsByUser(@PathVariable Long id)
    {
        List<Admission> admissions = admissionService.findAdmissionsByUser(id);
        return new ResponseEntity<>(admissions, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Admission> addAdmission(@RequestBody Admission admission) {
        Admission newAdmission = admissionService.addAdmission(admission);
        return new ResponseEntity<>(newAdmission, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Admission> updateAdmission(@RequestBody Admission admission) {
        Admission updatedAdmission = admissionService.updateAdmission(admission);
        return new ResponseEntity<>(updatedAdmission, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdmission(@PathVariable Long id) {
        admissionService.deleteAdmission(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
