package com.example.backend.repo;

import com.example.backend.model.Admission;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepo extends JpaRepository<Admission, Long> {
}
