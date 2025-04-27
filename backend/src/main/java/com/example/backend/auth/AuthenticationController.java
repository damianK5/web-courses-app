package com.example.backend.auth;

import com.example.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final EmailService emailService;
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        emailService.sendSimpleEmail(request.getEmail(), "Rejestracja nowego użytkownika", "Witaj "+ request.getFirstname() +" " + request.getLastname() + ". \nWysyłamy tę wiadomość żeby poinformować Cię, że rejestracja przebiegła pomyślnie. Życzymy owocnej nauki na naszej platformie\nPozdrawiamy,\nZespół FreeCourses" );
        System.out.println(request.getFirstname());
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
