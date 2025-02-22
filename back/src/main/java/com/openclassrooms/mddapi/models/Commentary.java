package com.openclassrooms.mddapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "COMMENTARY")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Commentary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @CreatedDate
    @Column
    private Date created_at;

    @ManyToOne
    @JoinColumn(name = "article_id")
    @JsonBackReference
    private Articles article;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
