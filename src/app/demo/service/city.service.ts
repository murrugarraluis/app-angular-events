import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CityResponse} from "../interfaces/city-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CityService {
    private url = environment.api
    constructor(private http: HttpClient) {
    }
    getAll() {
        return this.http.get<CityResponse>(`${this.url}/cities`)
    }
}
