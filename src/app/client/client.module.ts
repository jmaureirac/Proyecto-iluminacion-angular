import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { CLIENT_ROUTES } from './client.routes';

// Componentes
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CLIENT_ROUTES
    ],
    declarations: [
        ClientComponent,
        MainComponent
    ],
    exports: [
        ClientComponent,
        MainComponent
    ]
})
export class ClientModule { }
