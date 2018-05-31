import { Routes, RouterModule } from '@angular/router';

// Componentes
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
];

export const PANEL_ROUTES = RouterModule.forChild( panelRoutes );
