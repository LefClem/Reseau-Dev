package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Commentary;
import com.openclassrooms.mddapi.payload.request.CommentaryRequest;
import com.openclassrooms.mddapi.services.CommentaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/commentary")
public class CommentaryController {
    @Autowired
    CommentaryService commentaryService;

    @PostMapping(path = "/")
    public @ResponseBody Commentary createCommentary(@RequestBody CommentaryRequest request){
        return commentaryService.addCommentary(request.getContent(), request.getId());
    }

}
