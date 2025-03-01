package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.RegisterRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public ResponseEntity<MessageResponse> createUser(RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
        }

        User n = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .created_at(new Date())
                .build();

        userRepository.save(n);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    public String updateUser(
            String username,
            String email,
            String password,
            Integer id
    ){
        try {
            Optional<User> userOptional = userRepository.findById(Long.valueOf(id));
            User user = userOptional.get();

            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));

            userRepository.save(user);
            return "ok";
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public UserDTO getAuthUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        User user = userRepository.findByEmail(jwt.getSubject())
                .orElseThrow(() -> new RuntimeException("User not found"));
        ;
        System.out.println(user);

        return userMapper.convertToDTO(user);
    }

}
