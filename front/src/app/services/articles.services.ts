import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticlesServices {
    private pathService = 'http://localhost:8080/api/article';

    constructor(private httpClient: HttpClient){};

    public getArticles(): Observable<any>{
        return this.httpClient.get<any>(`${this.pathService}/`);
    }

    public getArticleById(id: number): Observable<any>{
        return this.httpClient.get<any>(`${this.pathService}/${id}`)
    }
}