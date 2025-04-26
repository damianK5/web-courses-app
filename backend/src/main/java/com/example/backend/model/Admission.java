package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Admission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="course_id", nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name="homework_id", nullable = false)
    private Homework homework;

    private String filepath;
    private long admissionDate;
    private String studentComment;
    private String teacherComment;
    private int grade;

}
