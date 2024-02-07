import {Component} from '@angular/core';
import {Event} from "../../../../interfaces/event.interface";
import {Router} from "@angular/router";

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-event-list-page',
    templateUrl: './event-list-page.component.html',
    styleUrl: './event-list-page.component.scss'
})
export class EventListPageComponent {
    cities: string[] = ['Trujillo', 'Lima', 'Chiclayo', 'Trujillo'];
    selectedCity: string = '';
    items: Event[] = [
        {
            id: 1,
            name: 'Karina & Timoteo',
            slug: 'karina-timoteo',
            poster: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-07',
            time: '19:00',
            description: '',
            content: 'Karina Rivera y Timoteo (Ricardo Bonilla) están de vuelta para llevarnos a un mundo lleno de emociones y risas. Este espectáculo promete ser inolvidable\n' +
                '\n' +
                'Información adicional\n' +
                '-Niños mayores de 01 año y medio pagan entradas.\n' +
                '-No cuenta con estacionamiento.',
            category: {
                id: 1,
                name: 'Infantil'
            },
            city: {
                id: 1,
                name: 'Lima'
            }
        }
    ]
    first: number = 0;

    rows: number = 5;

    constructor(private route: Router) {
    }

    onPageChange(event: PageEvent) {
        console.log(event);
        this.first = event.first;
        this.rows = event.rows;
    }

    showMore(slug: string) {
        this.route.navigateByUrl(`eventos/${slug}`);
    }
}
