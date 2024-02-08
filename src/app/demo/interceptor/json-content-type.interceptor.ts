import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class JsonContentTypeInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes('/upload-image')) {
            return next.handle(req); // No hagas nada, deja que la solicitud pase sin modificar
        }
        // Clona la solicitud y añade el encabezado 'Content-Type' si no está presente
        const jsonReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });

        // Continúa con la solicitud clonada
        return next.handle(jsonReq);
    }
}
