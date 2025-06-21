package com.example.backend.FileIOManager;

import com.example.backend.model.Course;
import com.example.backend.model.Homework;
import com.example.backend.model.User;
import com.example.backend.service.CourseService;
import com.example.backend.service.HomeworkService;
import com.example.backend.service.UserService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/files")

@Log
public class FileManagerController {
private final String sep = File.separator;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserService userService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private HomeworkService homeworkService;

    //ZAPIS DO AKTUALNYCH PLIKOW I ARCHIWUM

    public boolean uploadFile(MultipartFile file, String path)
    {
        try {
            fileStorageService.saveFile(file, path);
            return true;
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception during upload", e);
            return false;
        }
    }


    @PostMapping("/{courseid}/asset")
    public boolean uploadAsset(@PathVariable Long courseid, @RequestParam("file") List<MultipartFile> files,  @RequestParam("assetName") String assetName)
    {
        Course course = courseService.findCourseById(courseid);
        String basePath = Paths.get(course.getName(), "assets", assetName).toString();
        for (MultipartFile file : files) {
            String filePath = Paths.get(basePath, file.getOriginalFilename()).toString();
            boolean result = uploadFile(file, filePath);
            if(!result) return  false;
        }
        return true;
    }

    @PostMapping("/{courseid}/homework")
    public boolean uploadHomework(@PathVariable Long courseid, @RequestParam("file") MultipartFile file, @RequestParam("homeworkName") String homeworkName)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "homeworks", homeworkName).toString();
        return uploadFile(file, path);
    }

    @PostMapping("/{courseid}/{homeworkid}")
    public boolean uploadAdmission(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long userid, @RequestParam("file") List<MultipartFile> files) {
        User user = userService.findUserById(userid);
        Course course = courseService.findCourseById(courseid);
        Homework homework = homeworkService.findHomeworkById(homeworkid);
        String basePath = Paths.get(course.getName(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homework.getName()).toString();

        for (MultipartFile file : files) {
            String filePath = Paths.get(basePath, file.getOriginalFilename()).toString();
            boolean success = uploadFile(file, filePath);
            if (!success) return false;
        }
        return true;
    }


    public boolean uploadToArchive(MultipartFile file,@PathVariable String path)
    {
        try {
            fileStorageService.archiveFile(file, path);
            return true;
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception during upload", e);
            return false;
        }
    }
    @PostMapping("/archive/{courseid}/asset")
    public boolean uploadAssetToArchive(@PathVariable Long courseid, @RequestParam("file") MultipartFile file)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "asset").toString();
        return uploadToArchive(file, path);

    }

    @PostMapping("/archive/{courseid}/homework")
    public boolean uploadHomeworkToArchive(@PathVariable Long courseid, @RequestParam("file") MultipartFile file)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return uploadToArchive(file, path);
    }

    @PostMapping("/archive/{courseid}/{homeworkid}")
    public boolean uploadAdmissionToArchive(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long userid, @RequestParam("file") MultipartFile file)
    {
        User user = userService.findUserById(userid);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return uploadToArchive(file, path);
    }


    //USUWANIE PLIKU
    private boolean removeFile(String path, String fileName)
    {
        return fileStorageService.removeFile(fileName, path);
    }

    @DeleteMapping("/{courseid}/asset")
    public boolean removeAssetFile(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "asset").toString();
        return removeFile(path, filename);
    }

    @DeleteMapping("/{courseid}/homework")
    public boolean removeHomeworkFile(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return removeFile(path, filename);
    }

    @DeleteMapping("/{courseid}/{homeworkid}")
    public boolean removeAdmissionFile(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("filename") String filename, @RequestParam("userid") Long userid)
    {
        User user = userService.findUserById(userid);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return removeFile(path, filename);
    }

    private boolean removeArchivedFile(String path, String filename)
    {
        return fileStorageService.removeArchivedFile(filename, path);
    }

    @DeleteMapping("/archive/{courseid}/asset")
    public boolean removeArchivedAssetFile(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "asset").toString();
        return removeArchivedFile(path, filename);
    }

    @DeleteMapping("/archive/{courseid}/homework")
    public boolean removeArchivedHomeworkFile(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return removeArchivedFile(path, filename);
    }

    @DeleteMapping("/archive/{courseid}/{homeworkid}")
    public boolean removeArchivedAdmissionFile(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("filename") String filename, @RequestParam("userid") Long userid)
    {
        User user = userService.findUserById(userid);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return removeArchivedFile(path, filename);
    }

//POBIERANIE Z AKTUALNEGO KURSU I ARCHIWUM
    public ResponseEntity<Resource> downloadFile(String filename, String path)
    {
        try {
            var fileToDownload = fileStorageService.getDownloadFile(filename, path);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename =\"" + filename + "\"")
                    .contentLength(fileToDownload.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(new FileSystemResource(fileToDownload));
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{courseid}/asset")
    public ResponseEntity<Resource> downloadAsset(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "asset").toString();
        return downloadFile(filename, path);
    }

    @GetMapping("/{courseid}/homework")
    public ResponseEntity<Resource> downloadHomework(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return downloadFile(filename, path);
    }


    @GetMapping("/{courseid}/{homeworkid}")
    public ResponseEntity<Resource> downloadAdmission(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id, @RequestParam("filename") String filename)
    {
        User user = userService.findUserById(id);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return downloadFile(filename, path);
    }

    public ResponseEntity<Resource> downloadFromArchive(@PathVariable String path, @PathVariable String filename){
        try {
            var fileToDownload = fileStorageService.getArchivedFile(filename, path);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename = \"" + filename + "\"")
                    .contentLength(fileToDownload.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(new FileSystemResource(fileToDownload));
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/archive/{courseid}/asset")
    public ResponseEntity<Resource> downloadArchivedAsset(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(course.getName(), "asset").toString();
        return downloadFromArchive(filename, path);
    }

    @GetMapping("/archive/{courseid}/homework")
    public ResponseEntity<Resource> downloadArchivedHomework(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return downloadFromArchive(filename, path);
    }

    @GetMapping("/archive/{courseid}/{homeworkid}")
    public ResponseEntity<Resource> downloadArchivedAdmission(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id, @RequestParam("filename") String filename)
    {
        User user = userService.findUserById(id);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return downloadFromArchive(filename, path);
    }



    //TWORZENIE LIST

    private ResponseEntity<?> generateFileList( String path)
    {
        if (!Files.exists(Paths.get(path))) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Directory not found!");
        }

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(path))) {
            List<String> files = StreamSupport.stream(stream.spliterator(), false)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .toList();

            return ResponseEntity.ok(files);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to list files: " + e.getMessage());
        }
    }

    @GetMapping("/{courseid}/asset/list")
    public ResponseEntity<?> listAssetFiles(@PathVariable Long courseid) {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(FileStorageService.STORAGE_DIR, course.getName(), "assets").toString();

        return generateFileList( path);
    }
    @GetMapping("/{courseid}/homework/list")
    public ResponseEntity<?> listHomeworkFiles(@PathVariable Long courseid)
    {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(FileStorageService.STORAGE_DIR, course.getName(), "homeworks").toString();
        return generateFileList( path);
    }
    @GetMapping("/{courseid}/{homeworkid}/list")
    public ResponseEntity<?> listAdmissionFiles(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id)
    {
        User user = userService.findUserById(id);
        Course course = courseService.findCourseById(courseid);
        Homework homework = homeworkService.findHomeworkById(homeworkid);
        String path = Paths.get(FileStorageService.STORAGE_DIR,course.getName(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homework.getName()).toString();
        return generateFileList( path);
    }
    @GetMapping("/archive/{courseid}/asset/list")
    public ResponseEntity<?> listArchiveAssetFiles(@PathVariable Long courseid) {
        Course course = courseService.findCourseById(courseid);
        String path = Paths.get(FileStorageService.ARCHIVE_DIR, course.getName(), "asset").toString();

        return generateFileList( path);
    }
    @GetMapping("/archive/{courseid}/homework/list")
    public ResponseEntity<?> listArchivedHomeworkFiles(@PathVariable Long courseid)
    {
        String path = Paths.get(FileStorageService.ARCHIVE_DIR, courseid.toString(), "homework").toString();
        return generateFileList( path);
    }
    @GetMapping("/archive/{courseid}/{homeworkid}/list")
    public ResponseEntity<?> listArchivedAdmissionFiles(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id)
    {
        User user = userService.findUserById(id);
        String path = Paths.get(FileStorageService.ARCHIVE_DIR,courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return generateFileList( path);
    }







}
