import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticlesServices {
    private pathService = 'http://localhost:8080/api/article';
    private article = new BehaviorSubject<any>(null); // Stocke l’article actuel

    constructor(private httpClient: HttpClient){};

    public getArticles(): Observable<any>{
        return this.httpClient.get<any>(`${this.pathService}/`);
    }

    public getArticleById(id: number): Observable<any> {
        this.httpClient.get<any>(`${this.pathService}/${id}`).subscribe(article => {
            this.article.next(article); // Met à jour l'article
        });
        return this.article.asObservable();
    }

    public updateArticle(article: any) {
        this.article.next(article); // Met à jour sans recharger l’API
    }
}