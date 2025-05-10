package com.server.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transaction")
public class Transaction {
    @Id
    private String id;
    private String phoneNumber;
    private Double amount;
    private String spentCategory;
    
    @CreatedDate
    private LocalDateTime date = LocalDateTime.now();  // Set default value
    
    private String methodeOfPayment;
    private String receiver;
}