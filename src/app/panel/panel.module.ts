import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PANEL_ROUTES } from './panel.routes';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

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
import { UserComponent } from './user/user.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MisCotizacionesComponent } from './mis-cotizaciones/mis-cotizaciones.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

// Componentes modal
import { UpdateUserComponent } from '../components/modals/update-user/update-user.component';
import { CreateProductoComponent } from '../components/modals/create-producto/create-producto.component';
import { ViewCotizacionComponent } from '../components/modals/view-cotizacion/view-cotizacion.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PANEL_ROUTES,
        PipesModule
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
        CotizarComponent,
        UserComponent,
        PerfilComponent,
        MisCotizacionesComponent,
        EditarProductoComponent,
        UpdateUserComponent,
        CreateProductoComponent,
        ViewCotizacionComponent
    ],
    exports: [
        PanelComponent,
        DashboardComponent,
        UpdateUserComponent
    ]
})
export class PanelModule { }

