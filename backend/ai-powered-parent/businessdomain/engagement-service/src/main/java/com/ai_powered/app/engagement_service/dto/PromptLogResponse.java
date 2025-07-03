package com.ai_powered.app.engagement_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class PromptLogResponse {
    private Long id;
    private Long userId;
    private String prompt;
    private String generatedSubject;
    private String generatedBody;
    private LocalDateTime timestamp;
}
