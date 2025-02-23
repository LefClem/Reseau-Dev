package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.DTO.CommentaryDTO;
import com.openclassrooms.mddapi.models.Commentary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentaryMapper {
    @Autowired
    UserMapper userMapper;

    public CommentaryDTO toDto(Commentary commentary){
        CommentaryDTO dto = new CommentaryDTO();

        dto.setId(Math.toIntExact(commentary.getId()));
        dto.setContent(commentary.getContent());
        dto.setUser(userMapper.convertToDTO(commentary.getUser()));

        return dto;
    }
}
