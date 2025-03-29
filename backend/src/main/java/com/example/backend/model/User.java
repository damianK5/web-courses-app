package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

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
    private String name;
    private String email;
    private String password;
    @Column (nullable = false, updatable = false)
    private String indexCode;
}
