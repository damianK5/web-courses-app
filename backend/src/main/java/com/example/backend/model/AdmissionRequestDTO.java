package com.example.backend.model;

import lombok.Data;

@Data
public class AdmissionRequestDTO {
    private long id;
    private long admissionDate;
    private String filepath;
    private int grade;
    private String studentComment;
    private String teacherComment;
    private long userId;
    private long courseId;
    private long homeworkId;
}
