import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {EventResponse} from "../interfaces/responses/event-response.interface";
import {EventOneResponse} from "../interfaces/responses/event-one-response.interface";

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private url = environment.api

    constructor(private http: HttpClient) {
    }

    getAll(page: number, city: string = '', category: string = '') {
        return this.http.get<EventResponse>(`${this.url}/events?page=${page}&category=${category}&city=${city}`)
    }

    getOne(slug: string) {
        return this.http.get<EventOneResponse>(`${this.url}/events/${slug}`)
    }
}
