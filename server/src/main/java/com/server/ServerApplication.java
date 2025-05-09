package com.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {
	public static void main(String[] args ) {
		
		System.out.println("Server is running...");
		System.out.println("Server started on port 8080");
		SpringApplication.run(ServerApplication.class, args);
	}

}
