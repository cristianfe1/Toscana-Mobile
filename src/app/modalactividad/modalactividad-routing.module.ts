import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalactividadPage } from './modalactividad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalactividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalactividadPageRoutingModule {}
