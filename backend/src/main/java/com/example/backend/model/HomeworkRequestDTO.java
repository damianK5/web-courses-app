package com.example.backend.model;
import lombok.Data;

@Data
public class HomeworkRequestDTO {
    private long id;
    private long deadline;
    private String description;
    private String filepath;
    private int maxGrade;
    private String name;
    private boolean requireAdmission;
    private long course_id;
}
