package com.server.service;

import com.server.dto.MilestoneDTO;
import com.server.model.Milestone;
import com.server.repository.MilestoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    public Milestone createMilestone(MilestoneDTO milestoneDTO) {
        Milestone milestone = new Milestone();
        milestone.setSavedAmount(milestoneDTO.getSavedAmount());
        milestone.setGoalAmount(milestoneDTO.getGoalAmount());
        milestone.setDuration(milestoneDTO.getDuration());
        return milestoneRepository.save(milestone);
    }

    public List<Milestone> getAllMilestone() {
        return milestoneRepository.findAll();
    }

    public Milestone updateMilestone(MilestoneDTO milestoneDTO) {
        Optional<Milestone> existingMilestone = milestoneRepository.findById(milestoneDTO.getId());
        if (existingMilestone.isPresent()) {
            Milestone milestone = existingMilestone.get();
            milestone.setSavedAmount(milestoneDTO.getSavedAmount());
            milestone.setGoalAmount(milestoneDTO.getGoalAmount());
            milestone.setDuration(milestoneDTO.getDuration());
            return milestoneRepository.save(milestone);
        } else {
            throw new RuntimeException("No Milestone Found");
        }
    }

    public void deleteMilestone(String id) {
        Optional<Milestone> milestone = milestoneRepository.findById(id);
        if (milestone.isPresent()) {
            milestoneRepository.deleteById(id);
        }
    }
}
