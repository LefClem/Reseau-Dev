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

    constructor(private httpClient: HttpClient) { };

    public getArticles(): Observable<Article[]> {
        return this.httpClient.get<Article[]>(`${this.pathService}/`);
    }

    public getArticleById(id: number): Observable<Article> {
        return this.httpClient.get<Article>(`${this.pathService}/${id}`)
    }

    public createArticle(articleRequest: ArticleRequest): Observable<Article> {
        return this.httpClient.post<Article>(`${this.pathService}/create`, articleRequest);
    }
}