import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsAdminRountingModule} from "./events-admin-rounting.module";
import {EventCrudPageComponent} from "./pages/event-crud-page/event-crud-page.component";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {EditorModule} from "primeng/editor";
import {NgxEditorModule} from "ngx-editor";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
    declarations: [
        EventCrudPageComponent,
    ],
    imports: [
        CommonModule,
        EventsAdminRountingModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        EditorModule,
        NgxEditorModule,
        CalendarModule,
        PaginatorModule,
        ReactiveFormsModule,
    ]
})
export class EventsAdminModuleModule {
}
