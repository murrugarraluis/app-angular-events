import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventListPageComponent} from "./pages/event-list-page/event-list-page.component";
import {EventShowPageComponent} from "./pages/event-show-page/event-show-page.component";
import {EventsRountingModule} from "./events-rounting.module";


@NgModule({
    declarations: [
        EventListPageComponent,
        EventShowPageComponent,
    ],
    imports: [
        CommonModule,
        EventsRountingModule,
    ]
})
export class EventsModule {
}
