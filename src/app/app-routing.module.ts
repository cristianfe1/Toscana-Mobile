import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'gestion',
    loadChildren: () => import('./gestion/gestion.module').then( m => m.GestionPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cotizacion',
    loadChildren: () => import('./cotizacion/cotizacion.module').then( m => m.CotizacionPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'creacontacto',
    loadChildren: () => import('./creacontacto/creacontacto.module').then( m => m.CreacontactoPageModule)
  },
  {
    path: 'visita',
    loadChildren: () => import('./visita/visita.module').then( m => m.VisitaPageModule)
  },
  {
    path: 'pasaje',
    loadChildren: () => import('./pasaje/pasaje.module').then( m => m.PasajePageModule)
  },
  {
    path: 'modalactividad',
    loadChildren: () => import('./modalactividad/modalactividad.module').then( m => m.ModalactividadPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
