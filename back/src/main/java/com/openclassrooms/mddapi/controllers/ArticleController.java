package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.DTO.ArticleDTO;
import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.payload.request.ArticleRequest;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/article")
public class ArticleController {
    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ArticleService articleService;

    @PostMapping(path = "/create")
    public @ResponseBody Articles addArticle(
            @RequestBody ArticleRequest articleRequest
            ){
        return articleService.createArticle(articleRequest);
    }

    @GetMapping(path = "/")
    public List<ArticleDTO> getArticles(){
        return articleService.getArticlesList();
    }

    @GetMapping(path = "/{id}")
    public ArticleDTO getArticleById(@PathVariable Integer id){
        return articleService.getArticle(id);
    }
}
