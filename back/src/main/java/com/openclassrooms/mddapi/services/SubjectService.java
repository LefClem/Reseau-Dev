package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {
    @Autowired
    SubjectRepository subjectRepository;


}
