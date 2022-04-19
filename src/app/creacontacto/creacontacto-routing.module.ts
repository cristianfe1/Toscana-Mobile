import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreacontactoPage } from './creacontacto.page';

const routes: Routes = [
  {
    path: '',
    component: CreacontactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreacontactoPageRoutingModule {}
