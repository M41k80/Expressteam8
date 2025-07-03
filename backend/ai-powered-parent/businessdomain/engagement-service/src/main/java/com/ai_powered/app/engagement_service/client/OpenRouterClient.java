package com.ai_powered.app.engagement_service.client;

import com.ai_powered.app.engagement_service.config.OpenRouterFeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "openrouter", url = "${openrouter.api.url}", configuration = OpenRouterFeignConfig.class)
public interface OpenRouterClient{

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> generateEmail(@RequestBody Map<String, Object> body);
}
