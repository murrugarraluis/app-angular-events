import {Component, ElementRef, ViewChild} from '@angular/core';
import {Product} from "../../../../api/product";
import {ProductService} from "../../../../service/product.service";
import {MessageService} from "primeng/api";
import {Editor} from "ngx-editor";
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../interfaces/models/event.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../../service/city.service";
import {CategoryService} from "../../../../service/category.service";
import {Category} from "../../../../interfaces/models/category.interface";
import {City} from "../../../../interfaces/models/city.interface";
import {FileUploadService} from "../../../../service/file-upload.service";
import {EventCreateRequest} from "../../../../interfaces/request/event-create-request.interface";
import {EventUpdateRequest} from "../../../../interfaces/request/event-update-request.interface";
interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

export interface FileDetails {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}


@Component({
    selector: 'app-event-crud-page',
    templateUrl: './event-crud-page.component.html',
    styleUrl: './event-crud-page.component.scss',
    providers: [MessageService]
})
export class EventCrudPageComponent {
    @ViewChild('fileInputRef') fileInputRef!: ElementRef;
    editor: Editor;
    selectedFile!: FileDetails | null
    eventDialog: boolean = false;
    deleteProductDialog: boolean = false;
    event: Event | null = null;
    cols: any[] = [];
    categories: Category[] = [];
    cities: City[] = [];
    events: Event[] = []
    first!: number;
    rows!: number;
    totalRecords!: number;
    page = 1;
    search: string = ''
    eventForm: FormGroup;

    constructor(private productService: ProductService,
                private eventService: EventService,
                private cityService: CityService,
                private categoryService: CategoryService,
                private fileUploadService: FileUploadService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.editor = new Editor();
        this.cols = [
            {field: 'name', header: 'Nombre'},
            {field: 'poster', header: 'Imagen'},
            {field: 'date', header: 'Fecha'},
            {field: 'time', header: 'Hora'},
            {field: 'category', header: 'Categoria'},
            {field: 'city', header: 'Ciudad'}
        ];
        this.getEvent(this.page)


        this.eventForm = this.formBuilder.group({
            id: [''], // Control 'name' con validación requerida
            name: ['', Validators.required], // Control 'name' con validación requerida
            content: ['', Validators.required], // Control 'content' con validación requerida
            poster: [''], // Control 'poster' con validación requerida
            date: ['', Validators.required], // Control 'date' con validación requerida
            time: ['', Validators.required], // Control 'time' con validación requerida
            category: ['', Validators.required],
            city: ['', Validators.required],
        });


        this.categoryService.getAll().subscribe(response => {
            this.categories = response.data
        })
        this.cityService.getAll().subscribe(response => {
            this.cities = response.data
        })
    }

    getEvent(page: number, city = '', category = '', search = '') {
        this.eventService.getAll(page, city, category, search).subscribe({
            next: response => {
                this.events = response.data
                this.first = response.meta.from
                this.rows = response.meta.to
                this.totalRecords = response.meta.total
            }
        })
    }

    openNew() {
        this.event = null;
        this.eventForm.patchValue({
            id: '',
            name: '',
            content: '',
            poster: '',
            date: '',
            time: '',
            category: '', // Suponiendo que category es un objeto con una propiedad id
            city: '' // Suponiendo que city es un objeto con una propiedad id
        });
        this.eventDialog = true;
    }

    show(event: Event) {
        const url = `/eventos/${event.slug}`;
        window.open(url, '_blank'); // Abre en una nueva pestaña
    }

    editEvent(event: Event) {
        this.event = {...event};
        this.eventForm.patchValue({
            id: this.event.id,
            name: this.event.name,
            content: this.event.content,
            poster: this.event.poster,
            date: this.event.date,
            time: this.event.time,
            category: this.event.category, // Suponiendo que category es un objeto con una propiedad id
            city: this.event.city // Suponiendo que city es un objeto con una propiedad id
        });
        this.eventDialog = true;
    }

    deleteEvent(event: Event) {
        this.deleteProductDialog = true;
        this.event = {...event};
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.eventService.delete(this.event.id).subscribe({
            next: response => {
                this.getEvent(this.page, '', '', this.search)
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Evento Eliminado',
                    life: 3000
                });
            }
        })
        this.event = null;
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.eventService.getAll(event.page + 1).subscribe({
            next: response => {
                this.events = response.data
            }
        })
    }

    hideDialog() {
        this.eventDialog = false;
    }

    onSearch(value) {
        this.getEvent(this.page, '', '', this.search)
    }

    saveEvent() {
        // console.log(this.eventForm.value)
        // Verificar si el formulario es válido
        if (this.eventForm.invalid || (!this.eventForm.value.id && !this.selectedFile)) {
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Complete todos los campos',
                life: 3000
            });
            return;
        }
        if (this.eventForm.value.id) {
            this.update()
        } else {
            this.create()
        }
        this.eventDialog = false
        this.selectedFile = null
    }
    updateEvent(poster: string) {
        const { id, name, content, date, time, category, city } = this.eventForm.value;
        const payload: EventUpdateRequest = { name, content, date, time, category, city, poster };
        this.eventService.update(id, payload).subscribe({
            next: response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Evento Actualizado',
                    life: 3000
                });
                this.eventDialog = false;
                this.getEvent(this.page, '', '', this.search);
            }
        });
    }
    create(){
        const payloadFile = {
            file: this.selectedFile as unknown as File
        }
        this.fileUploadService.uploadImage(payloadFile).subscribe({
            next: response => {
                const {name, content, date, time, category, city} = this.eventForm.value
                const payload: EventCreateRequest = {
                    name,
                    content,
                    date,
                    time,
                    category,
                    city,
                    poster: response.secure_path
                }
                this.eventService.create(payload).subscribe({
                    next: response => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Evento Creado',
                            life: 3000
                        });
                        this.eventDialog = false
                        this.getEvent(this.page, '', '', this.search)
                    }
                })
            }
        })
    }
    update(){
        if (this.selectedFile) {
            const payloadFile = { file: this.selectedFile as unknown as File };
            this.fileUploadService.uploadImage(payloadFile).subscribe({
                next: response => {
                    this.updateEvent(response.secure_path);
                }
            });
        } else {
            this.updateEvent(this.eventForm.value.poster);
        }
    }

    openFileInput() {
        this.fileInputRef.nativeElement.click();
    }

    onFileSelected(event: any) {
        const selectedFile: FileDetails = event.target.files[0];
        this.selectedFile = selectedFile
        console.log('Archivo seleccionado:', selectedFile);
    }
}
