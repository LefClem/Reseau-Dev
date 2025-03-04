import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterRequest } from "src/app/interfaces/RegisterRequest.interface";
import { Observable } from "rxjs";
import { LoginRequest } from "src/app/interfaces/LoginRequest.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private pathService = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) { };

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.pathService}/login`, loginRequest);
  }

  public getAuthUser(): Observable<any>{
    return this.httpClient.get<any>(`${this.pathService}/me`)
  }
}