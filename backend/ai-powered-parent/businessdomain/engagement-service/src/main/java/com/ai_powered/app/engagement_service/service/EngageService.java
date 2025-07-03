package com.ai_powered.app.engagement_service.service;

import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptLogResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface EngageService {
    GeneratedMailResponse generateMail(PromptRequest request, HttpServletRequest httpRequest);

    List<PromptLogResponse> getAllLogsForUser(HttpServletRequest httpRequest);

    List<PromptLogResponse> getLast3LogsForUser(HttpServletRequest httpRequest);

    void deleteLogForUser(HttpServletRequest httpRequest, Long mailId);

}
