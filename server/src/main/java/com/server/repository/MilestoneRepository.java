package com.server.repository;

import com.server.model.Milestone;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MilestoneRepository extends MongoRepository<Milestone, String> {
    @NonNull
    Optional<Milestone>findById(@NonNull String id);
}
