package com.example.backend.repo;

import com.example.backend.model.Asset;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRepo extends JpaRepository<Asset, Long> {

    @Query("select a from Asset a where a.course.id = ?1")
    public List<Asset> getAssetsByCourse(@Param("course_id") long id);
}
