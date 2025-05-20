package com.example.backend.FileIOManager;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageService {

    private static final String sep = File.separator;
    private static final String ARCHIVE_DIR = "archive" + sep;
    public static final String STORAGE_DIR = "storage" + sep;


    private void save(MultipartFile fileToSave, String path, String dir) throws IOException
    {
        if(fileToSave == null)
        {
            throw new NullPointerException("fileToSave is null");
        }

        var targetPath = Paths.get(dir, path).normalize();
        var targetFile = new File(targetPath + sep + fileToSave.getOriginalFilename());
        if(!Objects.equals(targetFile.getParent(), dir + path))
        {
            throw new SecurityException("Unsupported filename");
        }
        Files.createDirectories(targetPath);
        Files.copy(fileToSave.getInputStream(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    public void saveFile(MultipartFile fileToSave, String path) throws IOException
    {
        save(fileToSave, path, STORAGE_DIR);
    }

    public void archiveFile(MultipartFile fileToSave, String path) throws IOException
    {
        save(fileToSave, path, ARCHIVE_DIR);
    }


    private File download(String filename, String path, String dir) throws  IOException
    {
        if(filename == null)
        {
            throw new NullPointerException("filename is null");
        }
        var fileToDownload = new File(dir + path + sep + filename);

        if(!Objects.equals(fileToDownload.getParent(), dir + path))
        {
            throw new SecurityException("Unsupported filename");
        }
        if(!fileToDownload.exists())
        {
            throw new FileNotFoundException("File not found");
        }

        return fileToDownload;
    }

    public File getDownloadFile(String filename, String path) throws IOException
    {
        return download(filename, path, STORAGE_DIR);
    }

    public File getArchivedFile(String filename, String path) throws IOException
    {
        return download(filename, path, ARCHIVE_DIR);
    }

}
