package com.ai_powered.app.engagement_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "prompt_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromptLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(length = 2048)
    private String prompt;

    @Column(length = 4096, name = "generated_subject")
    private String generatedSubject;

    @Column(length = 8192, name = "generated_body")
    private String generatedBody;

    private LocalDateTime timestamp;
}
