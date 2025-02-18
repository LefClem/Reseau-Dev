package com.openclassrooms.mddapi.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ARTICLES")
@Data
@Builder
public class Articles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @CreatedDate
    @Column
    private LocalDateTime created_at;

    @ManyToOne
    @JoinTable(
            name = "SUBJECTS",
            joinColumns = @JoinColumn( name = "subject_id")
    )
    private Subject subjects;

    @ManyToOne
    @JoinTable(
            name = "USERS",
            joinColumns = @JoinColumn(name = "author_id")
    )
    private User user;

}
