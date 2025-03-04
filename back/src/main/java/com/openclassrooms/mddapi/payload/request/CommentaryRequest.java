package com.openclassrooms.mddapi.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentaryRequest {
    private String content;
    private Integer id;
}

