import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {EventResponse} from "../interfaces/responses/event-response.interface";
import {EventOneResponse} from "../interfaces/responses/event-one-response.interface";
import {EventDeleteResponse} from "../interfaces/responses/event-delete-response.interface";
import {AuthService} from "./auth.service";
import {EventCreateRequest} from "../interfaces/request/event-create-request.interface";
import {EventCreateResponse} from "../interfaces/responses/event-create-response.interface";
import {EventUpdateRequest} from "../interfaces/request/event-update-request.interface";

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private url = environment.api

    constructor(private http: HttpClient,
                private authService: AuthService
    ) {
    }

    getAll(page: number, city: string = '', category: string = '', search = '') {
        return this.http.get<EventResponse>(`${this.url}/events?page=${page}&category=${category}&city=${city}&search=${search}`)
    }

    getOne(slug: string) {
        return this.http.get<EventOneResponse>(`${this.url}/events/${slug}`)
    }

    create(payload: EventCreateRequest) {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const options = {
            headers: headers
        };
        return this.http.post<EventCreateResponse>(`${this.url}/events`, payload, options)
    }

    update(id: number, payload: EventUpdateRequest) {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const options = {
            headers: headers
        };
        return this.http.put<EventUpdateRequest>(`${this.url}/events/${id}`, payload, options)
    }

    delete(id: number) {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const options = {
            headers: headers
        };
        return this.http.delete<EventDeleteResponse>(`${this.url}/events/${id}`, options)
    }
}
