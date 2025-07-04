package com.ai_powered.app.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.server.WebFilter;

@Bean
@Order(Ordered.HIGHEST_PRECEDENCE)
public WebFilter rawLogger() {
    return (exchange, chain) -> {
        System.err.println("▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶ REQUEST ▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶");
        System.err.println(exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
        exchange.getRequest().getHeaders().forEach((k,v) -> System.err.printf("%s: %s%n", k, v));
        System.err.println("─────────────────────────────────────────────────\n");
        return chain.filter(exchange)
                .doOnError(err -> err.printStackTrace());
    };
}
