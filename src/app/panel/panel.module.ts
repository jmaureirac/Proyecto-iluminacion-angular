import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PANEL_ROUTES } from './panel.routes';

// Componentes
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './producto/producto.component';
import { StockComponent } from './stock/stock.component';
import { MarcaComponent } from './marca/marca.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizarComponent } from './cotizar/cotizar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PANEL_ROUTES
    ],
    declarations: [
        PanelComponent,
        DashboardComponent,
        ProductoComponent,
        StockComponent,
        MarcaComponent,
        CategoriaComponent,
        SubcategoriaComponent,
        CotizacionComponent,
        CotizarComponent
    ],
    exports: [
        PanelComponent,
        DashboardComponent
    ]
})
export class PanelModule { }

