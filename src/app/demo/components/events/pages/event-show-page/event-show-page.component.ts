import {Component} from '@angular/core';
import {Event} from "../../../../interfaces/event.interface";

@Component({
    selector: 'app-event-show-page',
    templateUrl: './event-show-page.component.html',
    styleUrl: './event-show-page.component.scss'
})
export class EventShowPageComponent {
    event: Event = {
        id: 1,
        name: 'Karina & Timoteo',
        slug: 'karina-timoteo',
        poster: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
        date: '2024-02-07',
        time: '19:00',
        description: '',
        content: `
            <p>Karina Rivera y Timoteo (Ricardo Bonilla) están de vuelta para llevarnos a un mundo lleno de emociones y risas. Este espectáculo promete ser inolvidable.</p>
            <p>Información adicional:</p>
            <ul>
                <li>Niños mayores de 01 año y medio pagan entradas.</li>
                <li>No cuenta con estacionamiento.</li>
            </ul>
        `,
        category: {
            id: 1,
            name: 'Infantil'
        },
        city: {
            id: 1,
            name: 'Lima'
        }
    }
}
