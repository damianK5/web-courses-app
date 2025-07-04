package com.example.backend.model;


import lombok.Data;

@Data
public class AssetDTO {
    private long id;
    private String name;
    private long relevant_date;
    private String comment;
    private String filepath;
    private Long course_id;
}
