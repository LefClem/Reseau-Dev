package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/subject")
public class SubjectController {
    @Autowired
    SubjectRepository subjectRepository;

    @GetMapping(path = "/")
    public @ResponseBody List<Subject> getSubjects(){
        return subjectRepository.findAll();
    }
}
