package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.mappers.ArticleMapper;
import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    ArticleMapper articleMapper;

    private UserDTO getAuthenticatedUser(){
        return userService.getAuthUser();
    }

    public Articles createArticle(ArticleRequest articleRequest){
        System.out.println(articleRequest);
        Subject subject = subjectRepository.findById(Long.valueOf(articleRequest.getSubject_id()))
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().getId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Articles n = Articles.builder()
                .title(articleRequest.getTitle())
                .content(articleRequest.getContent())
                .subject(subject)
                .user(user)
                .created_at(new Date())
                .build();

        return articleRepository.save(n);
    }

    public List<ArticleDTO> getArticlesList(){
        Iterable<Articles> articles = articleRepository.findAll();
        List<ArticleDTO> articlesDtos = new ArrayList<>();
        for (Articles article: articles ){
            ArticleDTO articleDto = articleMapper.toDTO(article);
            articlesDtos.add(articleDto);
        }

        return articlesDtos;
    }

    public ArticleDTO getArticle(Integer id){
        Articles article = articleRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return articleMapper.toDTO(article);
    }

}
