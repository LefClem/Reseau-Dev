package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.models.Articles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ArticleMapper {
    @Autowired
    UserMapper userMapper;

    @Autowired
    CommentaryMapper commentaryMapper;

    public ArticleDTO toDTO(Articles articles){
        ArticleDTO dto = new ArticleDTO();

        dto.setId(Math.toIntExact(articles.getId()));
        dto.setTitle(articles.getTitle());
        dto.setContent(articles.getContent());
        dto.setUser(userMapper.convertToDTO(articles.getUser()));
        dto.setSubject(articles.getSubject());
        dto.setCreated_at(articles.getCreated_at());
        dto.setCommentaries(articles.getCommentaries().stream()
                .map(commentaryMapper::toDto)
                .collect(Collectors.toList()));

        return dto;
    }
}
