import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ClientComponent } from './client.component';
import { MainComponent } from './main/main.component';

const clientRoutes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'inicio', component: MainComponent }
        ]
    }
];

export const CLIENT_ROUTES = RouterModule.forChild( clientRoutes );
