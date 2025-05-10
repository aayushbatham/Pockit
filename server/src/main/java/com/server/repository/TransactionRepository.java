package com.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.server.model.Transaction;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    Optional<Transaction> findByPhoneNumber(String phoneNumber);
}
