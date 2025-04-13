package com.example.backend.FileIOManager;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageService {

    private static final String ARCHIVE_DIR = "/archive/";
    private static final String STORAGE_DIR = "/storage/";
    public void saveFile(MultipartFile fileToSave, String path) throws IOException
    {
        if(fileToSave == null)
        {
            throw new NullPointerException("fileToSave is null");
        }

        var targetFile = new File(STORAGE_DIR + path + File.separator + fileToSave.getOriginalFilename());
        if(!Objects.equals(targetFile.getParent(), STORAGE_DIR + path))
        {
            throw new SecurityException("Unsupported filename");
        }

        Files.copy(fileToSave.getInputStream(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    public File getDownloadFile(String filename) throws IOException
    {
        if(filename == null)
        {
            throw new NullPointerException("filename is null");
        }
        var fileToDownload = new File(STORAGE_DIR + File.separator + filename);

        if(!Objects.equals(fileToDownload.getParent(), STORAGE_DIR))
        {
            throw new SecurityException("Unsupported filename");
        }
        if(!fileToDownload.exists())
        {
            throw new FileNotFoundException("File not found");
        }

        return fileToDownload;
    }

}
