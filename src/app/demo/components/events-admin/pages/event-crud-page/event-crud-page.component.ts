import {Component} from '@angular/core';
import {Product} from "../../../../api/product";
import {ProductService} from "../../../../service/product.service";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Editor} from "ngx-editor";
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../interfaces/models/event.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../../service/city.service";
import {CategoryService} from "../../../../service/category.service";
import {Category} from "../../../../interfaces/models/category.interface";
import {City} from "../../../../interfaces/models/city.interface";

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-event-crud-page',
    templateUrl: './event-crud-page.component.html',
    styleUrl: './event-crud-page.component.scss',
    providers: [MessageService]
})
export class EventCrudPageComponent {
    date: Date[] | undefined;
    editor: Editor;
    html = '';
    text: string | undefined;

    productDialog: boolean = true;

    deleteProductDialog: boolean = false;


    products: Product[] = [];

    event: Event | null = null;


    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    categories: Category[]  = [];
    cities: City[] = [];

    events: Event[] = []
    first!: number;
    rows!: number;
    totalRecords!: number;

    page = 1;
    search: string = ''
    eventForm: FormGroup; // Declaración del FormGroup

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
                private eventService: EventService,
                private cityService: CityService,
                private categoryService: CategoryService,
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
            name: ['', Validators.required], // Control 'name' con validación requerida
            content: ['', Validators.required], // Control 'content' con validación requerida
            poster: ['', Validators.required], // Control 'poster' con validación requerida
            date: ['', Validators.required], // Control 'date' con validación requerida
            time: ['', Validators.required], // Control 'time' con validación requerida
            category: ['', Validators.required],
            city:  ['', Validators.required],
        });


        this.categoryService.getAll().subscribe(response=>{
            this.categories = response.data
        })
        this.cityService.getAll().subscribe(response=>{
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
        this.submitted = false;
        this.productDialog = true;
    }

    show(event: Event) {
        const url = `/eventos/${event.slug}`;
        window.open(url, '_blank'); // Abre en una nueva pestaña
    }

    editProduct(event: Event) {
        this.event = {...event};
        this.eventForm.patchValue({
            name: this.event.name,
            content: this.event.content,
            poster: this.event.poster,
            date: this.event.date,
            time: this.event.time,
            category: this.event.category, // Suponiendo que category es un objeto con una propiedad id
            city: this.event.city // Suponiendo que city es un objeto con una propiedad id
        });
        this.productDialog = true;
    }

    deleteProduct(event: Event) {
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
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        // this.submitted = true;
        //
        // if (this.product.name?.trim()) {
        //     if (this.product.id) {
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Updated',
        //             life: 3000
        //         });
        //     } else {
        //         this.product.id = this.createId();
        //         this.product.code = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        //         this.products.push(this.product);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Created',
        //             life: 3000
        //         });
        //     }
        //
        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    onSearch(value) {
        this.getEvent(this.page, '', '', this.search)
    }
    saveEvent() {
        console.log(this.eventForm.value)
        // Verificar si el formulario es válido
        if (this.eventForm.valid) {
            // Aquí puedes realizar acciones como enviar los datos del formulario al servidor
            console.log(this.eventForm.value);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Complete todos los campos',
                life: 3000
            });
            // Marcar todos los controles como tocados para mostrar los mensajes de error si los hay
            // this.eventForm.markAllAsTouched();
        }
    }
    onUpload(event: UploadEvent) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }
}
