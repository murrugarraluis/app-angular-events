import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
import {AuthService} from "../../../demo/service/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar-admin',
    templateUrl: './app.topbar-admin.component.html'
})
export class AppTopBarAdminComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router:Router,
        private authService:AuthService
    ) { }
    logout(){
        this.authService.logout();
        this.router.navigateByUrl('auth/login')
    }
}
