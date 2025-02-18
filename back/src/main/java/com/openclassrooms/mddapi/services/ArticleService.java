package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Articles;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserRepository userRepository;

    public Articles createArticle(String title, String content, Integer subject_id, Integer user_id){
        Optional<Subject> subject = subjectRepository.findById(Long.valueOf(subject_id));
        Optional<User> user = userRepository.findById(Long.valueOf(user_id));

        Articles n = Articles.builder()
                .title(title)
                .content(content)
                .subjects(subject)
                .user(user)
                .build();

        return articleRepository.save(n);
    }

}
