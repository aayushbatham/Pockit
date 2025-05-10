package com.server.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.dto.TransactionDTO;
import com.server.model.Transaction;
import com.server.repository.TransactionRepository;

@Service
public class TransactionService {
    
    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);
    
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setPhoneNumber(transactionDTO.getPhoneNumber());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setSpentCategory(transactionDTO.getSpentCategory());
        transaction.setMethodeOfPayment(transactionDTO.getMethodeOfPayment());
        transaction.setReceiver(transactionDTO.getReceiver());
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByPhoneNumber(String phoneNumber) {
        return transactionRepository.findByPhoneNumber(phoneNumber);
    }

    public Optional<Transaction> getTransactionById(String id) {
        return transactionRepository.findById(id);
    }

    public void deleteTransaction(String id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            transactionRepository.deleteById(id);
            logger.info("Transaction deleted - ID: {}, Amount: {}, Phone Number: {}", 
                       id, transaction.get().getAmount(), transaction.get().getPhoneNumber());
        }
    }
}
