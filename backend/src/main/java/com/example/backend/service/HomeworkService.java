package com.example.backend.service;

import com.example.backend.model.Homework;
import com.example.backend.repo.HomeworkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.html.HTMLObjectElement;

import java.util.List;

@Service
public class HomeworkService {
    private final HomeworkRepo homeworkRepo;

    @Autowired
    public HomeworkService(HomeworkRepo homeworkRepo) {
        this.homeworkRepo = homeworkRepo;
    }

    public Homework addHomework(Homework homework) {
        return homeworkRepo.save(homework);
    }

    public List<Homework> findAllHomeworks() {
        return homeworkRepo.findAll();
    }
    public List<Homework> findHomeworksByCourse(long id) {return homeworkRepo.getHomeworksByCourse(id);}

    public Homework updateHomework(Homework homework) {
        return homeworkRepo.save(homework);
    }

    public Homework findHomeworkById(Long id) {
        return homeworkRepo.findById(id).orElse(null);
    }

    public void deleteHomework(Long id) {
        homeworkRepo.deleteById(id);
    }
}
