import {Injectable} from '@angular/core';
import {CategoryResponse} from "../interfaces/responses/category-response.interface";
import {LoginRequest} from "../interfaces/request/login-request.interface";
import {LoginResponse} from "../interfaces/responses/login-response.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = environment.api

    constructor(private http: HttpClient) {
    }

    login(payload: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.url}/login`, JSON.stringify(payload))
    }
    logout(){
        localStorage.removeItem('token')
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | undefined {
        return localStorage.getItem('token')
    }
}
