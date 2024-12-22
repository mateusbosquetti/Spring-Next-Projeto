package io.github.mateusbosquetti.vendasapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class VendasApiApplication {
	/*
	Erro no lombok o que fazer
	Apagar a parte total do exclude
	especificar versão no build
	 */
	public static void main(String[] args) {
		SpringApplication.run(VendasApiApplication.class, args);
	}

}
