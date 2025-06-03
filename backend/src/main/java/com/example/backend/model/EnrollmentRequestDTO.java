package com.example.backend.model;

import lombok.Data;

@Data
public class EnrollmentRequestDTO {
    private Long user_id;
    private Long course_id;
    private Boolean confirmed;
    private EnrollmentType type;
    private int groupNumber;
}
