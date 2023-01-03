package com.kanban.apigatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableEurekaClient
@Configuration
public class ApiGatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayServiceApplication.class, args);
	}

}
