package com.server.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Budget {
    @Id
    private String id;
    private String userId;
    private String category;
    private Double amount;
    private String duration;
    private Date startDate;
    private Date endDate;
}
