import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentaryRequest } from "../interfaces/CommentaryRequest.interface";
import { ArticlesServices } from "./article.services";

@Injectable({
    providedIn: 'root'
})
export class CommentaryServices {
    private pathService = 'http://localhost:8080/api/commentary';

    constructor(private httpClient: HttpClient){}

    public addComment(comment: { content: string, id: number }): Observable<any>{
        return this.httpClient.post<any>(`${this.pathService}/`, comment);
    }
}