package com.server.controller;

import com.server.dto.AnalysisDTO;
import com.server.model.Analysis;
import com.server.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @PostMapping
    public ResponseEntity<Analysis> createAnalysis(@RequestBody AnalysisDTO analysisDTO){
        Analysis analysis=analysisService.createAnalysis(analysisDTO);
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/{id}/insights")
    public ResponseEntity<?> getInsights(
            @PathVariable String id,
            @RequestParam double currentSpending,
            @RequestParam double currentSaving
    ) {
        Optional<Analysis> result = analysisService.getAnalysisById(id, currentSpending, currentSaving);

        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No analysis data found for ID: " + id);
        }

        return ResponseEntity.ok(result.get());
    }
}
