package com.server.dto;

import lombok.Data;

@Data
public class AnalysisDTO {
    private String id;
    private String averageMonthlySpending;
    private String averageMonthlySaving;
    private String monthlySalary;
    private String currentBalance;
    private String feedback;
}
