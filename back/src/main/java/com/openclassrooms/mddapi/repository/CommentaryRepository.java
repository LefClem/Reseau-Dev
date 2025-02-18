package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Commentary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentaryRepository extends JpaRepository<Commentary, Long> {
}
