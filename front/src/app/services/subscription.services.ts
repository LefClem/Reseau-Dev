import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionServices {
    private pathService = 'http://localhost:8080/api/subscription';
    private subscriptionsSubject = new BehaviorSubject<any[]>([]); // Stocke la liste

    constructor(private httpClient: HttpClient){}

    public getSubscriptions(): Observable<any[]> {
        this.httpClient.get<any[]>(`${this.pathService}/`).subscribe((data) => {
          this.subscriptionsSubject.next(data);
        });
        return this.subscriptionsSubject.asObservable();
      }

    public subscribe(id: number) {
        const body = { subject_id: id }; 
        
        return this.httpClient.post<any>(`${this.pathService}/`, body, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    public unSubscribe(id: number): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: { subject_id: id } 
        };

        return this.httpClient.delete<any>(`${this.pathService}/`, httpOptions).pipe(
            tap(() => {
              this.getSubscriptions();
            })
          );;
    }
}