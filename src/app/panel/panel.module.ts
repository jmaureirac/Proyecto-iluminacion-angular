import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PANEL_ROUTES } from './panel.routes';

// Componentes
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PANEL_ROUTES
    ],
    declarations: [
        PanelComponent,
        DashboardComponent
    ],
    exports: [
        PanelComponent,
        DashboardComponent
    ]
})
export class PanelModule { }

