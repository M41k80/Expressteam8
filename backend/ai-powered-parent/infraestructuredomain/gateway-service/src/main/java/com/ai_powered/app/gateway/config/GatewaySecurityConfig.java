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
        // 1) Mostramos la cadena Base64 que lee realmente el bean
        System.out.println("🔐 jwt.secret raw: [" + jwtSecretBase64 + "]");
        // 2) Decodificamos y comprobamos la longitud en bytes
        byte[] secretBytes = Base64.getDecoder().decode(jwtSecretBase64);
        System.out.println("🔐 secretBytes.length = " + secretBytes.length);
        // 3) Creamos la clave HMAC
        this.secretKey = new SecretKeySpec(secretBytes, "HmacSHA256");
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        // Ya tenemos secretKey inicializado en init()
        return NimbusReactiveJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    @Order(Ordered.LOWEST_PRECEDENCE - 1)  // justo antes de SecurityWebFilterChain
    public WebFilter postCorsPreSecurityLogger() {
        return (exchange, chain) -> {
            System.err.println("→→→ POST-CORS / PRE-SECURITY →→→");
            System.err.println(exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
            exchange.getRequest().getHeaders()
                    .forEach((k, v) -> System.err.printf("%s: %s%n", k, v));
            System.err.println("──────────────────────────────────");
            return chain.filter(exchange);
        };
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
                                                            CorsConfigurationSource corsSource) {
        return http
                .cors(cors -> cors.configurationSource(corsSource))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .exceptionHandling(exc -> exc
                        // Captura fallos de autenticación (p.ej. falta JWT)
                        .authenticationEntryPoint((exchange, ex) -> {
                            System.err.println("❌ AuthenticationEntryPoint: " + ex.getMessage());
                            return exchange.getResponse().setComplete();
                        })
                        // Captura denegaciones de acceso (p.ej. permitAll mal configurado)
                        .accessDeniedHandler((exchange, denied) -> {
                            System.err.println("❌ AccessDeniedHandler: " + denied.getMessage());
                            return exchange.getResponse().setComplete();
                        })
                )
                .authorizeExchange(ex -> ex
                        .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .pathMatchers("/auth/**", "/api/auth/**").permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
                )
                .build();
    }

}
