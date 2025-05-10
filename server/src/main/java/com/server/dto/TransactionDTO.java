package com.server.dto;

import lombok.Data;

@Data
public class TransactionDTO {
    private String id;
    private String phoneNumber;
    private Double amount;
    private String spentCategory;
    private String methodeOfPayment;
    private String receiver;
}
