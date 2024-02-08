import {Component, OnInit} from '@angular/core';
import {Event} from "../../../../interfaces/models/event.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../../service/event.service";

@Component({
    selector: 'app-event-show-page',
    templateUrl: './event-show-page.component.html',
    styleUrl: './event-show-page.component.scss'
})
export class EventShowPageComponent implements OnInit {
    event!: Event

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            this.eventService.getOne(slug).subscribe({
                next: response => {
                    this.event = response.data
                },
                error: error => {
                    this.router.navigateByUrl('/notfound')
                }
            })
        });
    }
}
