package com.example.backend.service;

import com.example.backend.model.Course;
import com.example.backend.model.Homework;
import com.example.backend.repo.HomeworkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeworkService {
    private final HomeworkRepo homeworkRepo;
    @Autowired
    public HomeworkService(HomeworkRepo homeworkRepo)
    {
        this.homeworkRepo = homeworkRepo;
    }

    public List<Homework> findAllHomeworks()
    {
        return homeworkRepo.findAll();
    }

    public Homework findHomeworkById(Long id)
    {
        return homeworkRepo.findById(id).orElse(null);
    }

    public List<Homework> findHomeworksByCourse(Course course)
    {
        return homeworkRepo.getHomeworksByCourse(course.getId());
    }

    public Homework addHomework(Homework homework)
    {
        return homeworkRepo.save(homework);
    }

    public Homework updateHomework(Homework homework)
    {
        return homeworkRepo.save(homework);
    }

    public void deleteHomework(Homework homework)
    {
        homeworkRepo.delete(homework);
    }
}
