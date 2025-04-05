package com.example.backend.service;

import com.example.backend.repo.AssetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetService {
    private final AssetRepo assetRepo;

    @Autowired
    public AssetService(AssetRepo assetRepo)
    {
        this.assetRepo = assetRepo;
    }
}
