package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

enum EnrollementType
{
    MAIN_TEACHER, TEACHER, STUDENT
}

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Enrollment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="course_id", nullable = false)
    private Course course;

    private Boolean confirmed;

    private EnrollementType type;

    private int group;
}
