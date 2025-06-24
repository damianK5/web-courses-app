package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.*;
import com.example.backend.repo.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import org.w3c.dom.html.HTMLObjectElement;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HomeworkService {
    private final HomeworkRepo homeworkRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final EmailService emailService;
    private final CourseRepo courseRepo;
    private final AdmissionRepo admissionRepo;

    @Autowired
    public HomeworkService(
            HomeworkRepo homeworkRepo,
            EnrollmentRepo enrollmentRepo,
            EmailService emailService,
            CourseRepo courseRepo,
            AdmissionRepo admissionRepo
    ) {
        this.homeworkRepo = homeworkRepo;
        this.enrollmentRepo =  enrollmentRepo;
        this.emailService = emailService;
        this.courseRepo = courseRepo;
        this.admissionRepo = admissionRepo;
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

    @Transactional
    public void deleteHomework(Long id) {
        admissionRepo.deleteAll(admissionRepo.getAdmissionsByHomework(id));

        homeworkRepo.deleteById(id);
    }

    @Scheduled(cron = "0 0 8 * * *")
    public void sendOverdueHomeworkReportToTeachers() {
        List<Homework> homeworks = homeworkRepo.findAll();
        Date today = new Date();

        Calendar yesterdayCal = Calendar.getInstance();
        yesterdayCal.setTime(today);
        yesterdayCal.add(Calendar.DAY_OF_MONTH, -1);


        Map<User, List<String>> teacherReports = new HashMap<>();

        for (Homework homework : homeworks) {
            Date deadline = new Date(homework.getDeadline());
            Calendar deadlineCal = Calendar.getInstance();
            deadlineCal.setTime(deadline);

            if (!isSameDay(deadlineCal, yesterdayCal)) {
                continue;
            }

            List<Enrollment> enrollments = enrollmentRepo.getEnrollmentsByCourse(homework.getCourse().getId());

            List<User> students = new ArrayList<>();
            List<User> teachers = new ArrayList<>();

            for (Enrollment enrollment : enrollments) {
                if (enrollment.getType() == EnrollmentType.STUDENT) {
                    students.add(enrollment.getUser());
                } else if (enrollment.getType() == EnrollmentType.TEACHER || enrollment.getType() == EnrollmentType.MAIN_TEACHER) {
                    teachers.add(enrollment.getUser());
                }
            }

            List<Admission> admissions = admissionRepo.getAdmissionsByCourse(homework.getCourse().getId());
            Set<Long> submittedStudentIds = admissions.stream()
                    .map(adm -> adm.getUser().getId())
                    .collect(Collectors.toSet());

            List<User> studentsWhoDidNotSubmit = students.stream()
                    .filter(student -> !submittedStudentIds.contains(student.getId()))
                    .toList();

            if (!studentsWhoDidNotSubmit.isEmpty()) {
                StringBuilder report = new StringBuilder();
                report.append("Zadanie: ").append(homework.getName()).append(" (termin: wczoraj)\n");
                report.append("Nieoddane przez:\n");

                for (User student : studentsWhoDidNotSubmit) {
                    report.append("- ")
                            .append(student.getFirstName()).append(" ")
                            .append(student.getLastName()).append(" (")
                            .append(student.getEmail()).append(")\n");
                }

                for (User teacher : teachers) {
                    teacherReports.computeIfAbsent(teacher, k -> new ArrayList<>()).add(report.toString());
                }
            }
        }

        for (Map.Entry<User, List<String>> entry : teacherReports.entrySet()) {
            User teacher = entry.getKey();
            List<String> reports = entry.getValue();

            StringBuilder emailBody = new StringBuilder();
            emailBody.append("Witaj ").append(teacher.getFirstName()).append(",\n\n");
            emailBody.append("Poniżej znajduje się zbiorcza lista studentów, którzy nie oddali zadań domowych (z terminem wczoraj):\n\n");

            for (String report : reports) {
                emailBody.append(report).append("\n");
            }

            emailBody.append("\nZespół FreeCourses");

            emailService.sendSimpleEmail(
                    teacher.getEmail(),
                    "Zbiorcza lista studentów, którzy nie oddali zadań domowych",
                    emailBody.toString()
            );
        }
    }


    private boolean isSameDay(Calendar cal1, Calendar cal2) {
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
                cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH) &&
                cal1.get(Calendar.DAY_OF_MONTH) == cal2.get(Calendar.DAY_OF_MONTH);
    }
}
