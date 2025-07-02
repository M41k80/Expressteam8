package com.ai_powered.app.engagement_service.service;

import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;

public interface EngageService {
    GeneratedMailResponse generateMail(PromptRequest request);
}
