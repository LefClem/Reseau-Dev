package com.openclassrooms.mddapi.models;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "SUBJECTS")
@Data
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
}
