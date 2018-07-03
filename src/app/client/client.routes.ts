import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ClientComponent } from './client.component';
import { MainComponent } from './main/main.component';
import { ProductosClientComponent } from './productos-client/productos-client.component';
import { CategoriasClientComponent } from './categorias-client/categorias-client.component';
import { ContactoComponent } from './contacto/contacto.component';

const clientRoutes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: MainComponent },
            { path: 'productos', component: ProductosClientComponent },
            { path: 'categorias', component: CategoriasClientComponent },
            { path: 'contacto', component: ContactoComponent }
        ]
    }
];

export const CLIENT_ROUTES = RouterModule.forChild( clientRoutes );
