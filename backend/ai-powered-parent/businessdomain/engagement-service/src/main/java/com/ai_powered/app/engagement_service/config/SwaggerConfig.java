package com.ai_powered.app.engagement_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI engagementOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Engagement Service API")
                        .description("API para generar correos con IA usando OpenRouter")
                        .version("1.0"));
    }
}
