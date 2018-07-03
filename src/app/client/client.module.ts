import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { CLIENT_ROUTES } from './client.routes';

// Componentes
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosClientComponent } from './productos-client/productos-client.component';
import { CategoriasClientComponent } from './categorias-client/categorias-client.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CLIENT_ROUTES
    ],
    declarations: [
        ClientComponent,
        MainComponent,
        HeaderClientComponent,
        FooterClientComponent,
        ContactoComponent,
        ProductosClientComponent,
        CategoriasClientComponent
    ],
    exports: [
        ClientComponent,
        MainComponent
    ]
})
export class ClientModule { }
