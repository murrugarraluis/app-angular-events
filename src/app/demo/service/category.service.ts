import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryResponse} from "../interfaces/responses/category-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private url = environment.api
    constructor(private http: HttpClient) {
    }
    getAll() {
        return this.http.get<CategoryResponse>(`${this.url}/categories`)
    }
}
