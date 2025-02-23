package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO convertToDTO(User user){
        if (user == null){
            return null;
        }
        UserDTO dto = new UserDTO();
        dto.setId(Math.toIntExact(user.getId()));
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }

}
