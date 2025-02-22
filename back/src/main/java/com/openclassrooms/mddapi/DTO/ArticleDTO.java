package com.openclassrooms.mddapi.DTO;

import com.openclassrooms.mddapi.models.Commentary;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {
    private Integer id;
    private String title;
    private String content;
    private User user;
    private Subject subject;
    private Date created_at;
    private List<Commentary> commentaries;
}
