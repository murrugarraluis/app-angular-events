import {Component} from '@angular/core';
import {Product} from "../../../../api/product";
import {ProductService} from "../../../../service/product.service";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Editor} from "ngx-editor";
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../interfaces/models/event.interface";

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

interface City {
    name: string;
    code: string;
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

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    cities: City[] | undefined;

    events: Event[] = []
    first!: number;
    rows!: number;
    totalRecords!: number;

    page = 1;
    search: string = ''

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
                private eventService: EventService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.editor = new Editor();
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Nombre'},
            {field: 'poster', header: 'Imagen'},
            {field: 'date', header: 'Fecha'},
            {field: 'time', header: 'Hora'},
            {field: 'category', header: 'Categoria'},
            {field: 'city', header: 'Ciudad'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];

        this.getEvent(this.page)
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
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    show(event: Event) {
        const url = `/eventos/${event.slug}`;
        window.open(url, '_blank'); // Abre en una nueva pestaña
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
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
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onSearch(value) {
        this.getEvent(this.page, '', '', this.search)
    }

    onUpload(event: UploadEvent) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // onGlobalFilter(table: Table, event: Event) {
    //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    // }
}
