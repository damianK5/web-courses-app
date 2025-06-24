package com.example.backend.FileIOManager;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageService {

    private static final String sep = File.separator;
    public static final String ARCHIVE_DIR = "archive" + sep;
    public static final String STORAGE_DIR = "storage" + sep;


    private void save(MultipartFile fileToSave, String path, String dir) throws IOException {
        if (fileToSave == null) {
            throw new NullPointerException("fileToSave is null");
        }

        Path baseDir = Paths.get(dir).normalize().toAbsolutePath();
        Path fullTargetDir = baseDir.resolve(path).normalize();

        // This will prevent path traversal attempts (e.g. someone uploading a file with "../../etc/passwd")
        if (!fullTargetDir.startsWith(baseDir)) {
            throw new SecurityException("Path traversal attempt detected");
        }

        Files.createDirectories(fullTargetDir);

        Path targetFilePath = fullTargetDir.resolve(Objects.requireNonNull(fileToSave.getOriginalFilename())).normalize();
        Files.copy(fileToSave.getInputStream(), targetFilePath, StandardCopyOption.REPLACE_EXISTING);
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
        Path filePath = Paths.get(dir, path, filename).normalize();
        System.out.println(filePath);

        File fileToDownload = filePath.toFile();

        Path baseDir = Paths.get(dir).normalize().toAbsolutePath();
        Path resolvedFilePath = baseDir.resolve(path).resolve(filename).normalize();

        if (!resolvedFilePath.startsWith(baseDir)) {
            throw new SecurityException("Path traversal attempt detected");
        }

        fileToDownload = resolvedFilePath.toFile();
        if (!fileToDownload.exists()) {
            throw new FileNotFoundException("File not found");
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

    private boolean remove(String  filename, String path, String dir)
    {
        if(filename == null)
        {
            throw new NullPointerException("filename is null");
        }

        var targetPath = Paths.get(dir, path).normalize();
        var targetFile = new File(targetPath + sep + filename);

        if(!Objects.equals(targetFile.getParent(), dir + path))
        {
            throw new SecurityException("Unsupported filename");
        }

        return targetFile.delete();

    }

    public boolean removeFile(String filename, String path)
    {
        return remove(filename, path, STORAGE_DIR);
    }

    public boolean removeArchivedFile(String filename, String path)
    {
        return remove(filename, path, ARCHIVE_DIR);
    }

}
