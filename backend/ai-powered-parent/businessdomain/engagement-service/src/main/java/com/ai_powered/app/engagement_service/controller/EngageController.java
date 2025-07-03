package com.ai_powered.app.engagement_service.controller;

import com.ai_powered.app.engagement_service.dto.GeneratedMailResponse;
import com.ai_powered.app.engagement_service.dto.PromptLogResponse;
import com.ai_powered.app.engagement_service.dto.PromptRequest;
import com.ai_powered.app.engagement_service.service.EngageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/engage")
@RequiredArgsConstructor
public class EngageController {

    private final EngageService engageService;

    @PostMapping("/generate")
    public ResponseEntity<GeneratedMailResponse> generateMail(@RequestBody PromptRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(engageService.generateMail(request, httpRequest));
    }

    @GetMapping("/history")
    public ResponseEntity<List<PromptLogResponse>> getAllLogs(HttpServletRequest httpRequest) {
        return ResponseEntity.ok(engageService.getAllLogsForUser(httpRequest));
    }

    @GetMapping("/history/latest")
    public ResponseEntity<List<PromptLogResponse>> getLastThreeLogs(HttpServletRequest httpRequest) {
        return ResponseEntity.ok(engageService.getLast3LogsForUser(httpRequest));
    }

    @DeleteMapping("/history/{mailId}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long mailId, HttpServletRequest httpRequest) {
        engageService.deleteLogForUser(httpRequest, mailId);
        return ResponseEntity.noContent().build();
    }

}
