package com.server.dto;

import lombok.Data;

@Data
public class MilestoneDTO {
    private String id;
    private String savedAmount;
    private String goalAmount;
    private String duration;
}
