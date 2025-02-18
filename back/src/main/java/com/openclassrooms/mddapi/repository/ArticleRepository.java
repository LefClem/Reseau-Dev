package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Articles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Articles, Long> {
}
