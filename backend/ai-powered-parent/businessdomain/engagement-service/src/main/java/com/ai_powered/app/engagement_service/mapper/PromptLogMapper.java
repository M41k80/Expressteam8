package com.ai_powered.app.engagement_service.mapper;

import com.ai_powered.app.engagement_service.dto.PromptLogResponse;
import com.ai_powered.app.engagement_service.model.PromptLog;

public class PromptLogMapper {
    public static PromptLogResponse toDto(PromptLog log) {
        return PromptLogResponse.builder()
                .id(log.getId())
                .userId(log.getUserId())
                .prompt(log.getPrompt())
                .generatedSubject(log.getGeneratedSubject())
                .generatedBody(log.getGeneratedBody())
                .timestamp(log.getTimestamp())
                .build();
    }
}
