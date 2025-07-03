package com.ai_powered.app.engagement_service.repository;

import com.ai_powered.app.engagement_service.model.PromptLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromptLogRepository extends JpaRepository<PromptLog, Long> {

    List<PromptLog> findByUserIdOrderByTimestampDesc(Long userId);

    List<PromptLog> findTop3ByUserIdOrderByTimestampDesc(Long userId);
}
