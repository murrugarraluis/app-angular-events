import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsAdminRountingModule} from "./events-admin-rounting.module";
import {EventCrudPageComponent} from "./pages/event-crud-page/event-crud-page.component";


@NgModule({
    declarations: [
        EventCrudPageComponent,
    ],
    imports: [
        CommonModule,
        EventsAdminRountingModule,
    ]
})
export class EventsAdminModuleModule {
}
