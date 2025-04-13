package com.example.backend.FileIOManager;

import com.example.backend.model.Homework;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/files")
public class FileManagerController {


    @Autowired
    private FileStorageService fileStorageService;
    private static final Logger log = Logger.getLogger(FileManagerController.class.getName());

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
        String path = "/" + courseid.toString();
        return uploadFile(file, path);

    }



    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("filename") String filename)
    {
        try {
            var fileToDownload = fileStorageService.getDownloadFile(filename);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename = \"" + filename + "\"")
                    .contentLength(fileToDownload.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(new FileSystemResource(fileToDownload));
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
