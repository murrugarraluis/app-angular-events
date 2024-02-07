import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EventCrudPageComponent} from "./pages/event-crud-page/event-crud-page.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  EventCrudPageComponent},
    ])],
    exports: [RouterModule]
})
export class EventsAdminRountingModule { }
