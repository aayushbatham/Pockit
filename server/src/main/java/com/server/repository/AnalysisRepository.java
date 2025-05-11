package com.server.repository;

import com.server.model.Analysis;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnalysisRepository extends MongoRepository<Analysis, String> {
    @NonNull
    Optional<Analysis>findById(@NonNull String id);
}
