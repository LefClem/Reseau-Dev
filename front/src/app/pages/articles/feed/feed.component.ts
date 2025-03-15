import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/interfaces/Article.interface';
import { ArticlesServices } from 'src/app/services/article.services';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  constructor(private articleServices: ArticlesServices) { }

  private articlesSubject = new BehaviorSubject<Article[]>([]);
  public articles$ = this.articlesSubject.asObservable();
  public user = localStorage.getItem("token");
  public isSorted: boolean = false; // false = tri décroissant par défaut


  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleServices.getArticles().subscribe({
      next: articles => {        
        // Charger les articles triés par défaut (du plus récent au plus ancien)
        const sortedArticles = articles.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        this.articlesSubject.next(sortedArticles);
      },
      error: err => console.error(err)
    });
  }

  sortByDate() {
    this.isSorted = !this.isSorted;

    const sortedArticles = [...this.articlesSubject.value].sort((a, b) =>
      this.isSorted
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() // Croissant
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // Décroissant
    )
    this.articlesSubject.next(sortedArticles);
  }
}

