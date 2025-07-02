package com.ai_powered.app.engagement_service.client;
import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OpenRouterClient {
    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public GeneratedMailResponse generateFromPrompt(PromptRequest promptRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo");
        body.put("messages", new Object[]{
                Map.of("role", "system", "content", "You are an AI assistant that writes professional outbound marketing emails."),
                Map.of("role", "user", "content", promptRequest.getPrompt())
        });

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, Map.class);

        Map<String, Object> choices = ((Map<String, Object>) ((java.util.List<Object>) response.getBody().get("choices")).get(0));
        Map<String, String> message = (Map<String, String>) choices.get("message");

        // Simplistic parsing for now
        String content = message.get("content");
        String subject = "Mail generado automáticamente";
        return new GeneratedMailResponse(subject, content);
    }
}
