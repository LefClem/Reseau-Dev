import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ArticleRequest } from "../interfaces/ArticleRequest.interface";
import { Article } from "../interfaces/Article.interface";

@Injectable({
    providedIn: 'root'
})
export class ArticlesServices {
    private pathService = 'http://localhost:8080/api/article';
    private article = new BehaviorSubject<any>(null); // Stocke l’article actuel

    constructor(private httpClient: HttpClient) { };

    public getArticles(): Observable<Article[]> {
        return this.httpClient.get<Article[]>(`${this.pathService}/`);
    }

    public getArticleById(id: number): Observable<Article> {
        this.httpClient.get<Article>(`${this.pathService}/${id}`).subscribe(article => {
            this.article.next(article);
        });
        return this.article.asObservable();
    }

    public createArticle(articleRequest: ArticleRequest): Observable<Article> {
        return this.httpClient.post<Article>(`${this.pathService}/create`, articleRequest);
    }

    public updateArticle(article: Article) {
        this.article.next(article); // Met à jour sans recharger l’API
    }
}