package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/article")
public class ArticleController {
    @Autowired
    ArticleRepository articleRepository;

    @PostMapping(path = "/create")
    public @ResponseBody Articles addArticle(
            @RequestParam  String title,
            @RequestParam String content,
            @RequestParam Integer subject_id,
            @RequestParam Integer user_id
    ){

    }
}
