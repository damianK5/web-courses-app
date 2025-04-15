package com.example.backend.FileIOManager;

import com.example.backend.model.Homework;
import com.example.backend.model.User;
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

//TODO
// Potentially change the whole user for just ID and fetch it with UserService?
@Log
public class FileManagerController {
private final String sep = File.separator;

    @Autowired
    private FileStorageService fileStorageService;
    private UserService userService;

    //Ogolna metoda do uploadu, mozna jej uzyc do samego przesylu a w tych z mappingiem zrobic rozne typy np wysylanie assety, oddawanie zadania itp

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

    //Metoda do wrzucania assetu do kursu, podaje sie ID kursu jako argument
    @PostMapping("/{courseid}/asset/upload")
    public boolean uploadAsset(@PathVariable Long courseid, @RequestParam("file") MultipartFile file)
    {
        String path = Paths.get(courseid.toString(), "asset").toString();
        return uploadFile(file, path);

    }
    //Analogicznie, tylko ze dla wrzucania zadan domowycg
    @PostMapping("/{courseid}/homework/upload")
    public boolean uploadHomework(@PathVariable Long courseid, @RequestParam("file") MultipartFile file)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return uploadFile(file, path);
    }

    @PostMapping("/{courseid}/{homeworkid}/upload")
    public boolean uploadAdmission(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long userid, @RequestParam("file") MultipartFile file)
    {
        User user = userService.findUserById(userid);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return uploadFile(file, path);
    }




//Ogolna metoda do pobierania pliku
    public ResponseEntity<Resource> downloadFile(String filename, String path)
    {
        try {
            var fileToDownload = fileStorageService.getDownloadFile(filename, path);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename = \"" + filename + "\"")
                    .contentLength(fileToDownload.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(new FileSystemResource(fileToDownload));
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{courseid}/asset/download")
    public ResponseEntity<Resource> downloadAsset(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "asset").toString();
        return downloadFile(filename, path);
    }

    @GetMapping("/{courseid}/homework/download")
    public ResponseEntity<Resource> downloadHomework(@PathVariable Long courseid, @RequestParam("filename") String filename)
    {
        String path = Paths.get(courseid.toString(), "homework").toString();
        return downloadFile(filename, path);
    }

    @GetMapping("/{courseid}/{homeworkid}/download")
    public ResponseEntity<Resource> downloadAdmission(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id, @RequestParam("filename") String filename)
    {
        User user = userService.findUserById(id);
        String path = Paths.get(courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return downloadFile(filename, path);
    }

    @GetMapping("/{courseid}/asset/list")
    public ResponseEntity<?> listAssetFiles(@PathVariable Long courseid) {
        String path = Paths.get(FileStorageService.STORAGE_DIR, courseid.toString(), "asset").toString();

        return generateFileList( path);
    }
    @GetMapping("/{courseid}/homework/list")
    public ResponseEntity<?> listHomeworkFiles(@PathVariable Long courseid)
    {
        String path = Paths.get(FileStorageService.STORAGE_DIR, courseid.toString(), "homework").toString();
        return generateFileList( path);
    }
    @GetMapping("/{courseid}/{homeworkid}/list")
    public ResponseEntity<?> listAdmissionFiles(@PathVariable Long courseid, @PathVariable Long homeworkid, @RequestParam("userid") Long id)
    {
        User user = userService.findUserById(id);
        String path = Paths.get(FileStorageService.STORAGE_DIR,courseid.toString(), user.getFirstName() + "_" + user.getLastName() + "_" + user.getId(), homeworkid.toString()).toString();
        return generateFileList( path);
    }



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


}
