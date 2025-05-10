package com.server.controller;

import com.server.dto.MilestoneDTO;
import com.server.model.Milestone;
import com.server.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestone")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @PostMapping
    public ResponseEntity<Milestone> createMilestone(@RequestBody MilestoneDTO milestoneDTO){
        Milestone milestone=milestoneService.createMilestone(milestoneDTO);
        return ResponseEntity.ok(milestone);
    }
    
    @GetMapping
    public ResponseEntity<List<Milestone>> getAllMilestone(){
        return ResponseEntity.ok(milestoneService.getAllMilestone());
    }

    @PutMapping
    public ResponseEntity<Milestone> updateMilestone(@RequestBody MilestoneDTO milestoneDTO){
        Milestone updatedMilestone = milestoneService.updateMilestone(milestoneDTO);
        return ResponseEntity.ok(updatedMilestone);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteMilestone(@PathVariable String id){
        milestoneService.deleteMilestone(id);
        return ResponseEntity.ok().build();
    }
}
