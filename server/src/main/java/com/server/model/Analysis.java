package com.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "analysis")
public class Analysis {
    @Id
    private String id;
    private String averageMonthlySpending;
    private String averageMonthlySaving;
    private String monthlySalary;
    private String currentBalance;
    private String feedback;
}
