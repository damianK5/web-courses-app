package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repo.AdmissionRepo;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.EnrollmentRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.token.TokenRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final TokenRepo tokenRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final AdmissionRepo admissionRepo;

    @Autowired
    public UserService(
            UserRepo userRepo,
            TokenRepo tokenRepo,
            EnrollmentRepo enrollmentRepo,
            AdmissionRepo admissionRepo
    ) {
        this.userRepo = userRepo;
        this.tokenRepo = tokenRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.admissionRepo = admissionRepo;
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }

    public User findUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    @Transactional
    public void deleteUser(Long id) {
        // first delete records with foreign key
        tokenRepo.deleteAllByUser_Id(id);
        enrollmentRepo.deleteAll(enrollmentRepo.getEnrollmentsByUser(id));
        admissionRepo.deleteAll(admissionRepo.getAdmissionsByUser(id));

        // then delete the actual user
        userRepo.deleteById(id);
    }
}
