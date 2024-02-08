import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {AppLayoutAdminComponent} from "./layout/app.layout-admin.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {LoginComponent} from "./demo/components/auth/login/login.component";
import {AuthGuard} from "./demo/guards/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: '/eventos', pathMatch: 'full'
            },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: 'eventos',
                        loadChildren: () => import('./demo/components/events/events.module').then(m => m.EventsModule)
                    }
                ]
            },
            {
                path: 'admin', component: AppLayoutAdminComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'eventos',
                        pathMatch: 'full'
                    },
                    {
                        path: 'eventos',
                        loadChildren: () => import('./demo/components/events-admin/events-admin.module').then(m => m.EventsAdminModuleModule)
                    }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            {path: 'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
