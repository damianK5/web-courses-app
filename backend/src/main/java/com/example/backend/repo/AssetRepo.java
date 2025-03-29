package com.example.backend.repo;

import com.example.backend.model.Asset;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepo extends JpaRepository<Asset, Long> {
}
