package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.*;
import com.example.backend.repo.CourseRepo;
import com.example.backend.repo.EnrollmentRepo;
import com.example.backend.repo.HomeworkRepo;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import org.w3c.dom.html.HTMLObjectElement;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class HomeworkService {
    private final HomeworkRepo homeworkRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final EmailService emailService;
    private final CourseRepo courseRepo;

    @Autowired
    public HomeworkService(HomeworkRepo homeworkRepo, EnrollmentRepo enrollmentRepo, EmailService emailService, CourseRepo courseRepo) {
        this.homeworkRepo = homeworkRepo;
        this.enrollmentRepo =  enrollmentRepo;
        this.emailService = emailService;
        this.courseRepo = courseRepo;
    }

    public Homework addHomework(HomeworkRequestDTO homework) {
        Course course = courseRepo.findById(homework.getCourse_id()).orElseThrow(()->new ResourceNotFoundException("Course with id: "+homework.getCourse_id()+ " not found"));

        Homework newHomework = Homework.builder()
                .course(course)
                .name(homework.getName())
                .description(homework.getDescription())
                .deadline(homework.getDeadline())
                .maxGrade(homework.getMaxGrade())
                .requireAdmission(true)
                .filepath(homework.getFilepath())
                .build();
        return homeworkRepo.save(newHomework);
    }

    public List<Homework> findAllHomeworks() {
        return homeworkRepo.findAll();
    }
    public List<Homework> findHomeworksByCourse(long id) {return homeworkRepo.getHomeworksByCourse(id);}

    public Homework updateHomework(HomeworkRequestDTO homework) {
        Homework existing = homeworkRepo.findById(homework.getId()).orElseThrow(() -> new ResourceNotFoundException("Homework with id: " + homework.getId() + " not found"));
        Course course = courseRepo.findById(homework.getCourse_id()).orElseThrow(()->new ResourceNotFoundException("Course with id: "+homework.getCourse_id()+ " not found"));

        existing.setDescription(homework.getDescription());
        existing.setDeadline(homework.getDeadline());
        existing.setMaxGrade(homework.getMaxGrade());
        existing.setRequireAdmission(true);
        existing.setFilepath(homework.getFilepath());
        existing.setCourse(course);
        return homeworkRepo.save(existing);
    }

    public Homework findHomeworkById(Long id) {
        return homeworkRepo.findById(id).orElse(null);
    }

    public void deleteHomework(Long id) {
        homeworkRepo.deleteById(id);
    }

    @Scheduled(cron = "0 0 * * * * ")
    public void Reminder(){
        List<Homework> Homeworks = homeworkRepo.findAll();
        for (Homework homework: Homeworks){
            Date date = new Date(homework.getDeadline());
            Date today = new Date();

            Calendar calendar = Calendar.getInstance();
            Calendar calendar1 = Calendar.getInstance();

            calendar.setTime(today);
            calendar1.setTime(date);

            calendar.add(Calendar.DAY_OF_MONTH,1);

            if (calendar.get(Calendar.YEAR)==calendar1.get(Calendar.YEAR) && calendar.get(Calendar.MONTH)==calendar1.get(Calendar.MONTH) && calendar.get(Calendar.DAY_OF_MONTH)==calendar1.get(Calendar.DAY_OF_MONTH)){
                var enrollments = enrollmentRepo.getEnrollmentsByCourse(homework.getCourse().getId());

                for(Enrollment enrollment: enrollments){
                    User user = enrollment.getUser();
                    emailService.sendSimpleEmail(user.getEmail(), "Przypomnienie o zadaniu domowym", "Witaj "+ user.getFirstName() +" " + user.getLastName() + ". \nWysyłamy tę wiadomość żeby przypomnieć Ci, że do jutra jest termin zadania o tytule:" + homework.getName() +". Po więcej informacji zgłoś się na platformę. Życzymy owocnej nauki na naszej platformie\n\nPozdrawiamy,\nZespół FreeCourses" );

                }
            }
        }
    }
}
