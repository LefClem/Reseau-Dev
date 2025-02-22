package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Commentary;
import com.openclassrooms.mddapi.services.CommentaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/commentary")
public class CommentaryController {
    @Autowired
    CommentaryService commentaryService;

    @PostMapping(path = "/")
    public @ResponseBody Commentary createCommentary(@RequestParam String content, @RequestParam Integer id){
        return commentaryService.addCommentary(content, id);
    }

}
