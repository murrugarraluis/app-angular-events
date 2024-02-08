import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment";
import {FileUploadRequest} from "../interfaces/request/file-upload-request.interface";
import {FileUploadResponse} from "../interfaces/responses/file-upload-response.interface";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    private url = environment.api

    constructor(private http: HttpClient,
                private authService: AuthService
    ) {
    }
    uploadImage(payload: FileUploadRequest) {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const options = {
            headers: headers
        };
        const formData: FormData = new FormData();
        formData.append('file', payload.file); // Asegúrate de que 'file' sea el nombre que espera tu servidor para el archivo
        return this.http.post<FileUploadResponse>(`${this.url}/events`, formData, options)
    }
}
