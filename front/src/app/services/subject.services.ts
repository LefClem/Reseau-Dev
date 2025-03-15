import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "../interfaces/Subject.interface";

@Injectable({
    providedIn: 'root'
})
export class SubjectServices {
    private pathService = 'http://localhost:8080/api/subject';

    constructor(private httpClient: HttpClient){}

    public getSubjects(): Observable<Subject[]> {
        return this.httpClient.get<Subject[]>(`${this.pathService}/`);
    }
}