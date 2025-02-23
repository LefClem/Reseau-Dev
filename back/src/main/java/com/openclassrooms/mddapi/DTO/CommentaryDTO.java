package com.openclassrooms.mddapi.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentaryDTO {
    private Integer id;
    private String content;
    private UserDTO user;
}
