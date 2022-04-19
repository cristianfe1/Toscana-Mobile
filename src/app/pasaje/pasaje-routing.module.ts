import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasajePage } from './pasaje.page';

const routes: Routes = [
  {
    path: '',
    component: PasajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajePageRoutingModule {}
