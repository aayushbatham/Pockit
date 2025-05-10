package com.server.model;

import lombok.*;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "transaction")
public class Transaction {
    @Id
    private String id;
    private String userId;
    private Double amount;
    private String typeOfTransaction;
    private String spentCategory;
    private Date date;
    private String methodeOfPayment;
    private String merchant;
}
