package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.models.Commentary;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentaryRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class CommentaryService {
    @Autowired
    CommentaryRepository commentaryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    ArticleRepository articleRepository;

    private UserDTO getAuthenticatedUser(){
        return userService.getAuthUser();
    }

    public Commentary addCommentary(String content, Integer id){
        Articles article = articleRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Article not found"));

        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().getId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Commentary n = Commentary.builder()
                .content(content)
                .created_at(new Date())
                .article(article)
                .user(user)
                .build();

        return commentaryRepository.save(n);
    }

}
