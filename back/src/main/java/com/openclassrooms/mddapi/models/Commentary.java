package com.openclassrooms.mddapi.models;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "COMMENTARY")
@Data
public class Commentary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @CreatedDate
    @Column
    private LocalDateTime created_at;

    @ManyToOne
    @JoinTable(
            name = "ARTICLES",
            joinColumns = @JoinColumn(name = "post_id")
    )
    private Articles articles;

    @OneToOne
    @JoinTable(
            name = "USERS",
            joinColumns = @JoinColumn(name = "author_id")
    )
    private User user;

}
