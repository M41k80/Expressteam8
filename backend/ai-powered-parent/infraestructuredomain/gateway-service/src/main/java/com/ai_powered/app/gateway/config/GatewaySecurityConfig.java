package com.ai_powered.app.gateway.config;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.server.WebFilter;

import java.util.Base64;

@Configuration
@EnableWebFluxSecurity
public class GatewaySecurityConfig {

    @Value("${jwt.secret}")
    private String jwtSecretBase64;
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        byte[] secretBytes = Base64.getDecoder().decode(jwtSecretBase64);
        this.secretKey = new SecretKeySpec(secretBytes, "HmacSHA256");
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        return NimbusReactiveJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
                                                            CorsConfigurationSource corsSource) {
        http
                .cors(cors -> cors.configurationSource(corsSource))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(ex -> ex
                        // 1) Pre-flight CORS
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()
                        // 2) Endpoints públicos de auth y usuarios
                        .pathMatchers("/api/auth/**", "/auth/**",
                                "/api/users/**", "/users/**").permitAll()
                        // 3) TODO lo demás debe llevar JWT
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
                );

        return http.build();
    }

    @Bean
    @Order(Ordered.LOWEST_PRECEDENCE - 1)
    public WebFilter postCorsPreSecurityLogger() {
        return (exchange, chain) -> {
            System.err.println("→→→ POST-CORS / PRE-SECURITY →→→");
            System.err.println(exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
            exchange.getRequest().getHeaders().forEach((k, v) -> System.err.printf("%s: %s%n", k, v));
            System.err.println("──────────────────────────────────");
            return chain.filter(exchange);
        };
    }
}
