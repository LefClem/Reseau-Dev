import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterRequest } from "src/app/interfaces/RegisterRequest.interface";
import { Observable } from "rxjs";
import { LoginRequest } from "src/app/interfaces/LoginRequest.interface";
import { LoginResponse } from "../interfaces/LoginResponse.interface";
import { User } from "../interfaces/User.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private pathService = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) { };

  public register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.pathService}/login`, loginRequest);
  }

  public getAuthUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/me`);
  }

  public updateUser(registerRequest: RegisterRequest): Observable<String> {
    return this.httpClient.put<String>(`${this.pathService}/update`, registerRequest);
  }
}