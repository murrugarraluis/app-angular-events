import {Component, OnInit} from '@angular/core';
import {Event} from "../../../../interfaces/event.interface";
import {Router} from "@angular/router";
import {EventService} from "../../../../service/event.service";
import {CityService} from "../../../../service/city.service";
import {City} from "../../../../interfaces/city.interface";
import {Category} from "../../../../interfaces/category.interface";
import {CategoryService} from "../../../../service/category.service";

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
export class EventListPageComponent implements OnInit {
    cities: City[] = [];
    selectedCity: string = '';
    categories: Category[] = [];
    selectedCategory: string = '';
    events: Event[] = []
    first!: number;
    rows!: number;
    totalRecords!: number;

    page = 1;

    constructor(private route: Router,
                private eventService: EventService,
                private cityService: CityService,
                private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.getEvent(this.page, this.selectedCity, this.selectedCategory)
        this.cityService.getAll().subscribe({
            next: response => {
                this.cities = response.data
            }
        })
        this.categoryService.getAll().subscribe({
            next: response => {
                this.categories = response.data
            }
        })
    }

    async onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.eventService.getAll(event.page + 1).subscribe({
            next: response => {
                this.events = response.data
            }
        })
    }

    getEvent(page: number, city: string, category: string) {
        this.eventService.getAll(page, city, category).subscribe({
            next: response => {
                this.events = response.data
                this.first = response.meta.from
                this.rows = response.meta.to
                this.totalRecords = response.meta.total
            }
        })
    }

    showMore(slug: string) {
        this.route.navigateByUrl(`eventos/${slug}`);
    }

    onChangeFilter() {
        this.getEvent(this.page, this.selectedCity.toLowerCase(), this.selectedCategory.toLowerCase())
    }
}
