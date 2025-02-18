package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.RegisterRequest;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    BCryptPasswordEncoder passwordEncoder;

    public User createUser(RegisterRequest registerRequest){
        User n = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .created_at(new Date())
                .build();

        return userRepository.save(n);
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

    public Optional<UserDTO> getAuthUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        Optional<User> user = userRepository.findByEmail(jwt.getSubject());

        return user.map(this::convertToDTO);
    }

    public UserDTO convertToDTO (User user){
        UserDTO dto = new UserDTO();

        dto.setId(Math.toIntExact(user.getId()));
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setCreated_at(user.getCreated_at());

        return dto;
    }
}
