package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

enum AccountType
{
    ADMIN, TEACHER, STUDENT
}

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (nullable = false, updatable = false)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

}
