package org.Akhil.login.config;

import org.Akhil.common.model.Roles;
import org.Akhil.common.model.User;
import org.Akhil.common.repo.RolesRepo;
import org.Akhil.common.repo.UserRepo;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class KafkaTopicConfig {
    @Value("${spring.kafka.topic.name}")
    private String topicName;
    @Value("${spring.kafka.topic1.name}")
    private String topic1;

    @Bean
    public NewTopic topic(){
        return TopicBuilder.name(topicName).partitions(3).build();
    }
    @Bean
    public NewTopic topic1(){
        return TopicBuilder.name(topic1).partitions(3).build();
    }

    @Autowired
    private KafkaTemplate<String,String> template;


    @Bean
    public CommandLineRunner initData(UserRepo userRepo, RolesRepo rolesRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if(!userRepo.existsByEmail("akhil.vathaluru@gmail.com")){
                String userId="user"+ UUID.randomUUID().toString();
                template.send(topic().name(),userId);
                User theUser=userRepo.save(User.builder()
                        .id(userId)
                        .fullName("Akhil")
                        .password(passwordEncoder.encode("akhil.vathaluru@gmail.com"))
                        .phoneNumber("8500618999")
                        .email("akhil.vathaluru@gmail.com")
                        .build());
                Roles userRole=Roles.builder()
                        .id("role"+UUID.randomUUID().toString())
                        .role(101)
                        .userId(userId)
                        .build();
                Roles adminRole=Roles.builder()
                        .id("role"+UUID.randomUUID().toString())
                        .role(100)
                        .userId(userId)
                        .build();
                rolesRepo.save(userRole);
                rolesRepo.save(adminRole);

            }
        };
    }
}
