package com.example.backend.service;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Asset;
import com.example.backend.model.AssetDTO;
import com.example.backend.model.Course;
import com.example.backend.repo.AssetRepo;
import com.example.backend.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {
    private final AssetRepo assetRepo;
    private final CourseRepo courseRepo;

    @Autowired
    public AssetService(AssetRepo assetRepo, CourseRepo courseRepo) {
        this.assetRepo = assetRepo;
        this.courseRepo = courseRepo;
    }

    public Asset addAsset(AssetDTO asset) {
        Course course = courseRepo.findById(asset.getCourse_id()).orElseThrow(()->new ResourceNotFoundException("Course with id: "+asset.getCourse_id()+ " not found"));

        Asset asset1 = Asset.builder()
                .course(course)
                .name(asset.getName())
                .comment(asset.getComment())
                .filepath(asset.getFilepath())
                .relevantDate(asset.getRelevantDate())
                .build();

        return assetRepo.save(asset1);
    }

    public List<Asset> findAllAssets() {
        return assetRepo.findAll();
    }
    public List<Asset> findAssetByCourse(long id) {return assetRepo.getAssetsByCourse(id);}

    public Asset updateAsset(Asset asset) {
        return assetRepo.save(asset);
    }

    public Asset findAssetById(Long id) {
        return assetRepo.findById(id).orElse(null);
    }

    public void deleteAsset(Long id) {
        assetRepo.deleteById(id);
    }
}
