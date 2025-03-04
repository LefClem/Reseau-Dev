package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.DTO.TokenDTO;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.RegisterRequest;
import com.openclassrooms.mddapi.payload.response.LoginResponse;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @GetMapping(path = "/me")
    public @ResponseBody ResponseEntity<UserDTO> getUser(){
        return ResponseEntity.ok(userService.getAuthUser());
    }

    @PutMapping(path = "/update")
    public @ResponseBody String updateUser(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password
    ){
        Integer id = userService.getAuthUser().getId();
        return userService.updateUser(username, email, password, id);
    }

    @PostMapping(path = "/register")
    public @ResponseBody ResponseEntity<MessageResponse> register(@Valid  @RequestBody RegisterRequest registerRequest){
        try {
            return userService.createUser(registerRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping(path = "/login")
    public @ResponseBody ResponseEntity<LoginResponse> getToken(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password)
            );

            String token = jwtService.generateToken(authentication);
            UserDTO userDTO = userService.getUserByEmail(loginRequest.email);

            return ResponseEntity.ok(new LoginResponse(userDTO, token));
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
