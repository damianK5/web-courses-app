package com.example.backend.controller;

import com.example.backend.model.Homework;
import com.example.backend.service.HomeworkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homework")
public class HomeworkController {
    private final HomeworkService homeworkService;

    public HomeworkController(HomeworkService homeworkService) {
        this.homeworkService = homeworkService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Homework>> getAllHomeworks() {
        List<Homework> homeworks = homeworkService.findAllHomeworks();
        return new ResponseEntity<>(homeworks, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Homework> getHomeworkById(@PathVariable Long id) {
        Homework homework = homeworkService.findHomeworkById(id);
        return new ResponseEntity<>(homework, HttpStatus.OK);
    }

    @GetMapping("/find/course/{id}")
    public ResponseEntity<List<Homework>> getHomeworksByCourse(@PathVariable Long id)
    {
        List<Homework> homeworks = homeworkService.findHomeworksByCourse(id);
        return  new ResponseEntity<>(homeworks, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Homework> addHomework(@RequestBody Homework homework) {
        Homework newHomework = homeworkService.addHomework(homework);
        return new ResponseEntity<>(newHomework, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Homework> updateHomework(@RequestBody Homework homework) {
        Homework updatedHomework = homeworkService.updateHomework(homework);
        return new ResponseEntity<>(updatedHomework, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHomework(@PathVariable Long id) {
        homeworkService.deleteHomework(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
