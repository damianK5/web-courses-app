package com.example.backend.service;

import com.example.backend.model.Asset;
import com.example.backend.repo.AssetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {
    private final AssetRepo assetRepo;

    @Autowired
    public AssetService(AssetRepo assetRepo) {
        this.assetRepo = assetRepo;
    }

    public Asset addAsset(Asset asset) {
        return assetRepo.save(asset);
    }

    public List<Asset> findAllAssets() {
        return assetRepo.findAll();
    }

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
