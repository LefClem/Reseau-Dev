package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.DTO.ArticleListDTO;
import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    ModelMapper modelMapper;

    private Optional<UserDTO> getAuthenticatedUser(){
        return userService.getAuthUser();
    }

    public Articles createArticle(ArticleRequest articleRequest){
        System.out.println(articleRequest);
        Subject subject = subjectRepository.findById(Long.valueOf(articleRequest.getSubject_id()))
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().get().getId()))
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

    public ArticleListDTO getArticlesList(){
        Iterable<Articles> articles = articleRepository.findAll();
        List<ArticleDTO> articlesDtos = new ArrayList<>();
        for (Articles article: articles ){
            ArticleDTO articleDto = modelMapper.map(article, ArticleDTO.class);
            articlesDtos.add(articleDto);
        }

        ArticleListDTO articleListDTO = new ArticleListDTO();
        articleListDTO.setArticles(articlesDtos);
        return articleListDTO;
    }

    public Optional<ArticleDTO> getArticle(Integer id){
        Optional<Articles> article = articleRepository.findById(Long.valueOf(id));
        return article.map(this::convertToDTO);
    }

    public ArticleDTO convertToDTO(Articles articles){
        ArticleDTO dto = new ArticleDTO();

        dto.setId(Math.toIntExact(articles.getId()));
        dto.setTitle(articles.getTitle());
        dto.setContent(articles.getContent());
        dto.setUser(articles.getUser());
        dto.setSubject(articles.getSubject());
        dto.setCreated_at(articles.getCreated_at());
        dto.setCommentaries(articles.getCommentaries());

        return dto;
    }


}
