package com.ai_powered.app.engagement_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedMailResponse {
    private String subject;
    private String body;
}
