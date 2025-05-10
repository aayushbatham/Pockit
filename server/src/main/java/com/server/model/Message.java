package com.server.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    private String id;
    private String userId;
    private String rawText;
    private boolean parsed;
    private String extractedAmount;
    private String extractedUpiId;
    private String transactionId;
}
