package nl.bentels.test.micro.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class MicroTestConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroTestConfigServerApplication.class, args);
	}

}
