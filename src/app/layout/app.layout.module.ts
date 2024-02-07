import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RippleModule} from 'primeng/ripple';
import {AppMenuComponent} from './components/menu/app.menu.component';
import {AppMenuitemComponent} from './components/menu/app.menuitem.component';
import {RouterModule} from '@angular/router';
import {AppTopBarComponent} from './components/topbar/app.topbar.component';
import {AppFooterComponent} from './components/footer/app.footer.component';
import {AppConfigModule} from './config/config.module';
import {AppSidebarComponent} from "./components/sidebar/app.sidebar.component";
import {AppLayoutAdminComponent} from "./app.layout-admin.component";
import {AppLayoutComponent} from "./app.layout.component";

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutAdminComponent,
        AppLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule
    ],
    exports: [AppLayoutAdminComponent, AppLayoutComponent]
})
export class AppLayoutModule {
}
