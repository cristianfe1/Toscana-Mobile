import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacontactoPageRoutingModule } from './creacontacto-routing.module';

import { CreacontactoPage } from './creacontacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacontactoPageRoutingModule
  ],
  declarations: [CreacontactoPage]
})
export class CreacontactoPageModule {}
