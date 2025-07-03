package com.ai_powered.app.engagement_service.service.impl;

import com.ai_powered.app.engagement_service.client.OpenRouterClient;
import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptLogResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;
import com.ai_powered.app.engagement_service.model.PromptLog;
import com.ai_powered.app.engagement_service.repository.PromptLogRepository;
import com.ai_powered.app.engagement_service.service.EngageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.ai_powered.app.engagement_service.mapper.PromptLogMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EngageServiceImpl implements EngageService {

    private final OpenRouterClient openRouterClient;
    private final PromptLogRepository promptLogRepository;

    @Override
    public GeneratedMailResponse generateMail(PromptRequest request, HttpServletRequest httpServletRequest) {
        Long userId = (Long) httpServletRequest.getAttribute("userId");

        String enhancedPrompt = """
        You are an AI assistant specialized in writing professional, warm, and emotionally intelligent emails for a wide variety of purposes. 
        Your response must be a fully written email and a brief subject line, both clean and ready to send with no placeholders or edit notes.

        RULES:
        - The subject line must be concise, meaningful, and related to the email content.
        - The body of the email should have a proper greeting, a coherent message, and a thoughtful closing.
        - NEVER include placeholder tags like [Your Name], [Insert Link], or [Your Company].
        - DO NOT include instructions for the user to edit the text.
        - The text must be grammatically correct and written in natural, human-like English.
        - Avoid slashes, code formatting, or any markdown characters.
        - Do not use emojis, unless explicitly requested.
        - This email will be copied and sent directly—make it final and polished.

        Now, based on the following user request, generate the email:
        """ + request.getPrompt();

        Map<String, Object> body = Map.of(
                "model", "mistralai/mistral-7b-instruct",
                "messages", new Object[]{
                        Map.of("role", "system", "content", "You are a professional email writing assistant."),
                        Map.of("role", "user", "content", enhancedPrompt)
                }
        );

        Map<String, Object> response = openRouterClient.generateEmail(body);
        Map<String, Object> choices = (Map<String, Object>) ((List<Object>) response.get("choices")).get(0);
        Map<String, String> message = (Map<String, String>) choices.get("message");

        String content = message.get("content");
        String[] lines = content.split("\n", 2);
        String subject = lines[0].replace("Subject:", "").trim();
        String bodyText = lines.length > 1 ? lines[1].trim() : content.trim();

        GeneratedMailResponse generated = new GeneratedMailResponse(subject, bodyText);

        promptLogRepository.save(PromptLog.builder()
                .userId(userId)
                .prompt(request.getPrompt())
                .generatedSubject(subject)
                .generatedBody(bodyText)
                .timestamp(LocalDateTime.now())
                .build());

        return generated;
    }

    @Override
    public List<PromptLogResponse> getAllLogsForUser(HttpServletRequest httpServletRequest) {
        Long userId = (Long) httpServletRequest.getAttribute("userId");
        return promptLogRepository.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(PromptLogMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PromptLogResponse> getLast3LogsForUser(HttpServletRequest httpServletRequest) {
        Long userId = (Long) httpServletRequest.getAttribute("userId");
        return promptLogRepository.findTop3ByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(PromptLogMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLogForUser(HttpServletRequest httpServletRequest, Long mailId) {
        Long userId = (Long) httpServletRequest.getAttribute("userId");
        PromptLog log = promptLogRepository.findById(mailId)
                .orElseThrow(() -> new RuntimeException("No se encontró el mail"));
        if (!log.getUserId().equals(userId)) {
            throw new RuntimeException("No tenés permiso para borrar este mail");
        }
        promptLogRepository.delete(log);
    }

}
