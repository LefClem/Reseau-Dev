package com.openclassrooms.mddapi.payload.request;

import com.openclassrooms.mddapi.validators.ValidPassword;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Builder
public class RegisterRequest {
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @ValidPassword
    private String password;

    @NotBlank
    private String username;

}
