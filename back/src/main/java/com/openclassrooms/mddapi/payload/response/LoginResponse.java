package com.openclassrooms.mddapi.payload.response;

import com.openclassrooms.mddapi.DTO.UserDTO;

public class LoginResponse {
    private String token;

    public LoginResponse(UserDTO user, String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
