package com.server.service;

import com.server.dto.AnalysisDTO;
import com.server.model.Analysis;
import com.server.repository.AnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnalysisService {

    @Autowired
    private AnalysisRepository analysisRepository;

    public Analysis createAnalysis(AnalysisDTO analysisDTO){
        Analysis analysis=new Analysis();
        analysis.setAverageMonthlySpending(analysisDTO.getAverageMonthlySpending());
        analysis.setAverageMonthlySaving(analysisDTO.getAverageMonthlySaving());
        analysis.setMonthlySalary(analysisDTO.getMonthlySalary());
        analysis.setCurrentBalance(analysisDTO.getCurrentBalance());
        analysis.setFeedback(analysisDTO.getFeedback());
        return analysisRepository.save(analysis);
    }

    public Optional<Analysis> getAnalysisById(String id, double currentSpending, double currentSaving) {
        Optional<Analysis> analysis = analysisRepository.findById(id);
        if (analysis.isEmpty()) {
            return Optional.empty();
        }

        Analysis data = analysis.get();
        double averageSpending = Double.parseDouble(data.getAverageMonthlySpending());
        double averageSaving = Double.parseDouble(data.getAverageMonthlySaving());

        double spendingChange = ((currentSpending - averageSpending) / averageSpending) * 100;
        double savingChange = ((currentSaving - averageSaving) / averageSaving) * 100;

        StringBuilder feedback = new StringBuilder();
        if (savingChange > 0) {
            feedback.append("Your savings have increased by ")
                    .append(String.format("%.2f", savingChange))
                    .append("%");
        } else {
            feedback.append("Your savings have dropped by ")
                    .append(String.format("%.2f", Math.abs(savingChange)))
                    .append("%");
        }

        data.setFeedback(feedback.toString());
        return Optional.of(data);
    }
}
