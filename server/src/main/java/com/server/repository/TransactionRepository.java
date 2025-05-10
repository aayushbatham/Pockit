package com.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.server.model.Transaction;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByPhoneNumber(String phoneNumber);
}
