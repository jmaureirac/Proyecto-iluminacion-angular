import { Routes, RouterModule } from '@angular/router';

// Guards
import { LoginGuard } from '../services/service.index';

// Componentes
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './producto/producto.component';
import { StockComponent } from './stock/stock.component';
import { MarcaComponent } from './marca/marca.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizarComponent } from './cotizar/cotizar.component';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
        canActivate: [LoginGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'productos', component: ProductoComponent, data: { titulo: 'Productos' } },
            { path: 'inventario', component: StockComponent, data: { titulo: 'Inventario' } },
            { path: 'cotizar', component: CotizarComponent, data: { titulo: 'Cotizar' } },
            { path: 'cotizaciones', component: CotizacionComponent, data: { titulo: 'Cotizaciones' } },
            { path: 'clasificacion/marcas', component: MarcaComponent, data: { titulo: 'Marcas' } },
            { path: 'clasificacion/categorias', component: CategoriaComponent, data: { titulo: 'Categorias' } },
            { path: 'clasificacion/subcategorias', component: SubcategoriaComponent, data: { titulo: 'Subcategorias' } }
            
        ]
    }
];

export const PANEL_ROUTES = RouterModule.forChild( panelRoutes );
