package com.example.backend.controller;

import com.example.backend.model.Asset;
import com.example.backend.model.AssetDTO;
import com.example.backend.service.AssetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asset")
public class AssetController {
    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.findAllAssets();
        return new ResponseEntity<>(assets, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        Asset asset = assetService.findAssetById(id);
        return new ResponseEntity<>(asset, HttpStatus.OK);
    }

    @GetMapping("/find/course/{id}")
    public ResponseEntity<List<Asset>> getAssetsByCourse(@PathVariable Long id)
    {
        List<Asset> assets = assetService.findAssetByCourse(id);
        return new ResponseEntity<>(assets, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Asset> addAsset(@RequestBody AssetDTO asset) {
        Asset newAsset = assetService.addAsset(asset);
        return new ResponseEntity<>(newAsset, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Asset> updateAsset(@RequestBody Asset asset) {
        Asset updatedAsset = assetService.updateAsset(asset);
        return new ResponseEntity<>(updatedAsset, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
