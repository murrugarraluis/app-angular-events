import {Component} from '@angular/core';
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
    cities: string[] = ['Trujillo', 'Lima', 'Chiclayo','Trujillo'];
    selectedCity: string = '';
    items = [
        {
            title: 'Evento 1 Evento 1',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-07 12:00 PM'
        },
        {
            title: 'Evento 2',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-08 3:00 PM'
        },
        {
            title: 'Evento 1',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-07 12:00 PM'
        },
        {
            title: 'Evento 2',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-08 3:00 PM'
        },
        {
            title: 'Evento 1',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-07 12:00 PM'
        },
        {
            title: 'Evento 2',
            image: 'https://s3.us-west-2.amazonaws.com/joinnus.com/user/1586376/NWbx2h7J87poUNq.jpeg',
            date: '2024-02-08 3:00 PM'
        }
    ]
    first: number = 0;

    rows: number = 5;

    onPageChange(event: PageEvent) {
        console.log(event);
        this.first = event.first;
        this.rows = event.rows;
    }
}
