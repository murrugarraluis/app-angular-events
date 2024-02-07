import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EventListPageComponent} from "./pages/event-list-page/event-list-page.component";
import {EventShowPageComponent} from "./pages/event-show-page/event-show-page.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  EventListPageComponent},
        { path: ':slug', component:  EventShowPageComponent}
    ])],
    exports: [RouterModule]
})
export class EventsRountingModule { }
