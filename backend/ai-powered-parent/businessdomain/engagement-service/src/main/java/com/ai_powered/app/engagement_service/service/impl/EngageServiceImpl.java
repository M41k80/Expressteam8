package com.ai_powered.app.engagement_service.service.impl;

import com.ai_powered.app.engagement_service.client.OpenRouterClient;
import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;
import com.ai_powered.app.engagement_service.model.PromptLog;
import com.ai_powered.app.engagement_service.repository.PromptLogRepository;
import com.ai_powered.app.engagement_service.service.EngageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EngageServiceImpl implements EngageService {

    private final OpenRouterClient openRouterClient;
    private final PromptLogRepository promptLogRepository;

    @Override
    public GeneratedMailResponse generateMail(PromptRequest request) {
        GeneratedMailResponse response = openRouterClient.generateFromPrompt(request);

        PromptLog log = PromptLog.builder()
                .userId(request.getUserId())
                .prompt(request.getPrompt())
                .generatedSubject(response.getSubject())
                .generatedBody(response.getBody())
                .timestamp(LocalDateTime.now())
                .build();

        promptLogRepository.save(log);
        return response;
    }
}
